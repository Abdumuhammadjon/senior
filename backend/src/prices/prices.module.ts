import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { SupabaseModule } from '../supabase/supabase.module'; 

@Module({
  imports: [SupabaseModule],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
