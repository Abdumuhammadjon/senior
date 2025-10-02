import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { SupabaseModule } from '../supabase/supabase.module'; 
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, SupabaseModule],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
