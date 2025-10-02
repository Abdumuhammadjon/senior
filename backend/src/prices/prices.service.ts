import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(PricesService.name); // ✅ Logger qo‘shildi

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
    return this.getPrices();
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

  async fetchPricesFromApi(): Promise<Price[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://fakestoreapi.com/products'),
      );

      this.logger.log('HTTP response keys: ' + Object.keys(response || {}).join(', '));
      const products = response?.data;
      if (!products || !Array.isArray(products)) {
        this.logger.error('API returned unexpected body:', products);
        throw new InternalServerErrorException('API’dan kutilgan format qaytmadi');
      }

      this.logger.log('API dan olingan products soni: ' + products.length);

      const prices: Price[] = products.map((product: any) => ({
        id: crypto.randomUUID(),
        product: product.title,
        country: 'USA',
        unit: 'piece',
        currency: 'USD',
        price: product.price,
        created_at: new Date(),
      }));

      return prices;
    } catch (err) {
      const error = err as any;
      this.logger.error('fetchPricesFromApi — full error:', error);
      if (error?.isAxiosError) {
        this.logger.error('Axios status:', error.response?.status);
        this.logger.error('Axios response data:', error.response?.data);
      }
      throw new InternalServerErrorException(`API xatosi: ${error?.message || 'unknown'}`);
    }
  }

  async fetchAndSavePrices(): Promise<Price[]> {
  try {
    const prices = await this.fetchPricesFromApi();
    this.logger.log(`API dan olingan prices soni: ${prices.length}`);

    // Supabase default id va created_at ishlashi uchun olib tashlaymiz
    const insertData = prices.map(({ id, created_at, ...rest }) => rest);

    const { data, error } = await this.client()
      .from('prices')
      .insert(insertData)
      .select();

    if (error) {
      this.logger.error('Supabase insert xato:', error);
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Supabase ga ${data?.length || 0} ta yozuv qo‘shildi`);
    return data as Price[];
  } catch (err) {
    this.logger.error('fetchAndSavePrices — umumiy xato:', err);
    throw new InternalServerErrorException(
      err instanceof Error ? err.message : 'Noma’lum xato',
    );
  }
}

}
