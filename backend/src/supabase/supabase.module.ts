// supabase.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [ConfigModule],
  providers: [SupabaseService],
  exports: [SupabaseService], // boshqa joylarda ishlatish uchun
})
export class SupabaseModule {}
