import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';
import { Logger } from '@nestjs/common';

@Controller('prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  create(@Body() createPriceDto: CreatePriceDto): Promise<Price> {
    return this.pricesService.create(createPriceDto);
  }

  @Get()
  findAll(): Promise<Price[]> {
    return this.pricesService.findAll();
  }

  // ⚡️ Avval statik routelar
  @Get('from-api')
  async fetchFromApi(): Promise<Price[]> {
    return this.pricesService.fetchPricesFromApi();
  }

  @Post('fetch-save')
  async fetchAndSave(): Promise<Price[]> {
    return this.pricesService.fetchAndSavePrices();
  }

  // ⚡️ Keyin dinamik routelar
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Price> {
    return this.pricesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto): Promise<Price> {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.pricesService.remove(id);
  }
}
