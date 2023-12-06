import { Module } from '@nestjs/common';
import { PortfolioManagementModule } from './portfolio-management/portfolio-management.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PortfolioManagementModule,
    MongooseModule.forRoot(
      'mongodb+srv://alex:1234@cluster0.xttrwwh.mongodb.net/portfolio-demo',
    ),
  ],
})
export class AppModule {}
