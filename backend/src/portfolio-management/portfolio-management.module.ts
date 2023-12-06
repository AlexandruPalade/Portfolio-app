import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PortfolioEntry,
  PortfolioEntrySchema,
} from './Schemas/portfolio.schema';
import { PortfolioMangementService } from './portfolio-mangement.service';
import { PortfolioMangementController } from './portfolio-mangement.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PortfolioEntry.name, schema: PortfolioEntrySchema },
    ]),
  ],
  controllers: [PortfolioMangementController],
  providers: [PortfolioMangementService],
})
export class PortfolioManagementModule {}
