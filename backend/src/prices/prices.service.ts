import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

@Injectable()
export class PricesService {
  async create(createPriceDto: CreatePriceDto): Promise<Price> {
    const { data, error } = await supabase
      .from('prices')
      .insert(createPriceDto)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findAll(): Promise<Price[]> {
    const { data, error } = await supabase.from('prices').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string): Promise<Price> {
    const { data, error } = await supabase.from('prices').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, updatePriceDto: UpdatePriceDto): Promise<Price> {
    const { data, error } = await supabase
      .from('prices')
      .update(updatePriceDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: string): Promise<string> {
    const { error } = await supabase.from('prices').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return `Price with id=${id} deleted successfully`;
  }
}
