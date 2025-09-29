import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PricesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private client() {
    return this.supabaseService.getClient();
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
    const { data, error } = await this.client().from('prices').select('*');
    if (error) throw new InternalServerErrorException(error.message);
    return data as Price[];
  }

  async findOne(id: string): Promise<Price> {
    const { data, error } = await this.client().from('prices').select('*').eq('id', id).single();
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
}
