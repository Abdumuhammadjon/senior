import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricesModule } from './prices/prices.module';


@Module({
  imports: [PricesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// --- IGNORE ---import { Module } from '@nestjs/common';
//  import { Module } from '@nestjs/common';
// import { PricesModule } from './prices/prices.module';

// @Module({
//   imports: [PricesModule],
// })
// export class AppModule {}
