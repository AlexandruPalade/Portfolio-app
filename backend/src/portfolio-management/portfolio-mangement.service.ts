import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PortfolioEntry,
  PortfolioEntryDocument,
} from './Schemas/portfolio.schema';
import { Model } from 'mongoose';

@Injectable()
export class PortfolioMangementService {
  constructor(
    @InjectModel(PortfolioEntry.name)
    private readonly portfolioModel: Model<PortfolioEntryDocument>,
  ) {}

  async createPortfolio(
    portfolioEntry: PortfolioEntry,
  ): Promise<PortfolioEntry> {
    const newPortfolio = new this.portfolioModel(portfolioEntry);
    console.log(newPortfolio);
    return newPortfolio.save();
  }

  async getAllPortfolios(): Promise<PortfolioEntry[]> {
    const portfolios = this.portfolioModel.find().exec();
    return portfolios;
  }

  async getPorfolioById(id: string): Promise<PortfolioEntry> {
    const porfolio = this.portfolioModel.findById(id).exec();
    return porfolio;
  }

  async updatePorfolioById(
    id: string,
    portfolio: PortfolioEntry,
  ): Promise<PortfolioEntry | null> {
    const updatedPortfolio = await this.portfolioModel
      .findOneAndUpdate({ _id: id }, portfolio, { new: true })
      .exec();
    return updatedPortfolio;
  }

  async getPortfolioByTitle(title: string): Promise<PortfolioEntry | null> {
    return this.portfolioModel.findOne({ title }).exec();
  }

  async deletePorfolioById(id: string): Promise<PortfolioEntry | null> {
    const deletedPortfolio = await this.portfolioModel
      .findOneAndDelete({ _id: id })
      .lean();

    if (!deletedPortfolio) {
      return null;
    }

    return deletedPortfolio as PortfolioEntry;
  }

  async toggleIsHiddenPorfolio(id: string): Promise<PortfolioEntry> {
    const porfolio = await this.portfolioModel.findById(id);

    if (!porfolio) {
      return null;
    }

    porfolio.isHidden = !porfolio.isHidden;

    return porfolio.save();
  }
}
