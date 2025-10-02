import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { SupabaseService } from '../supabase/supabase.service';
import * as crypto from 'crypto';

export class Price {
  id: string;
  product: string;
  country: string;
  unit: string;
  currency: string;
  price: number;
  created_at: Date;
}

@Injectable()
export class PricesService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly httpService: HttpService,
  ) {}

  private client() {
    return this.supabaseService.getClient();
  }

  async getPrices(): Promise<Price[]> {
    const { data, error } = await this.client().from('prices').select('*');
    if (error) throw new InternalServerErrorException(error.message);
    return data as Price[];
  }

  async create(createPriceDto: CreatePriceDto): Promise<Price> {
    const { data, error } = await this.client()
      .from('prices')
      .insert(createPriceDto)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data as Price;
  }

  async findAll(): Promise<Price[]> {
    return this.getPrices(); // getPrices bilan bir xil
  }

  async findOne(id: string): Promise<Price> {
    const { data, error } = await this.client()
      .from('prices')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new InternalServerErrorException(error.message);
    return data as Price;
  }

  async update(id: string, updatePriceDto: UpdatePriceDto): Promise<Price> {
    const { data, error } = await this.client()
      .from('prices')
      .update(updatePriceDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data as Price;
  }

  async remove(id: string): Promise<string> {
    const { error } = await this.client().from('prices').delete().eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return `Price with id=${id} deleted successfully`;
  }

  // Yangi method: Fake Store API dan ma'lumot olib, Price formatiga map qilish
 async fetchPricesFromApi(): Promise<Price[]> {
    try {
      const { data: products } = await firstValueFrom(
        this.httpService.get('https://fakestoreapi.com/products'),
      );

      const prices: Price[] = products.map((product: any) => ({
      id: crypto.randomUUID(),  // Yangi UUID generatsiya
      product: product.title,
      country: 'USA',
      unit: 'piece',
      currency: 'USD',
      price: product.price,
      created_at: new Date(),
    }))

      return prices;
    } catch (error) {
      throw new InternalServerErrorException(`API xatosi: ${error.message}`);
    }
  }

async fetchAndSavePrices(): Promise<Price[]> {
  const prices = await this.fetchPricesFromApi();
  console.log('API dan olingan prices soni:', prices.length); // Bu qismni qo'shing

  const insertData = prices.map(p => ({ ...p, id: undefined })); // UUID uchun
  console.log('Insert qilinayotgan data (birinchi 1 ta):', insertData[0]); // Birinchi elementni ko'rsatish

  const { data, error } = await this.client()
    .from('prices')
    .insert(insertData)
    .select();

  console.log('Supabase insert natija - Data soni:', data ? data.length : 0);
  console.log('Supabase insert xato:', error ? error.message : 'Yo\'q'); // Xato yoki OK

  if (error) throw new InternalServerErrorException(error.message);
  return data as Price[];
}
}