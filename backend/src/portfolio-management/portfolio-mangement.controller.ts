import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PortfolioMangementService } from './portfolio-mangement.service';
import { PortfolioEntry } from './Schemas/portfolio.schema';
import { Response } from 'express';

@Controller('portfolios')
export class PortfolioMangementController {
  constructor(private readonly portfolioService: PortfolioMangementService) {}

  @Post()
  async createPortfolioEntry(
    @Body() portfolioEntry: PortfolioEntry,
    @Res() res: Response,
  ) {
    try {
      const newPortfolio =
        await this.portfolioService.createPortfolio(portfolioEntry);
      console.log(portfolioEntry);
      return res.status(HttpStatus.OK).json(newPortfolio);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error:
            'Duplicate title or description. Please provide a unique description or title.',
        });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to create portoflio' });
      }
    }
  }

  @Get()
  async getAllPortfolios(@Res() res: Response) {
    try {
      const portfolios = await this.portfolioService.getAllPortfolios();
      if (!portfolios) {
        res.status(HttpStatus.NOT_FOUND).json({ error: 'No porfolios found' });
      }
      return res.status(HttpStatus.OK).json(portfolios);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to fetch porfolios' });
    }
  }

  @Get(':id')
  async getPorfolioById(@Param('id') id: string, @Res() res: Response) {
    try {
      const porfolio = await this.portfolioService.getPorfolioById(id);
      if (!porfolio) {
        res.status(HttpStatus.NOT_FOUND).json({ error: 'No portfolio found' });
      }
      return res.status(HttpStatus.OK).json(porfolio);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to fetch portfolio' });
    }
  }

  @Put(':id')
  async updatePortfolioById(
    @Param('id') id: string,
    @Body() updatedPortfolio: PortfolioEntry,
    @Res() res: Response,
  ) {
    try {
      const existingPortfolio = await this.portfolioService.getPortfolioByTitle(
        updatedPortfolio.title,
      );

      if (existingPortfolio && existingPortfolio._id !== id) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'This title already exists' });
      }
      const updated = await this.portfolioService.updatePorfolioById(
        id,
        updatedPortfolio,
      );

      if (!updated) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: `No portfolio found with ID: ${id}` });
      }

      return res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      console.error('Error updating portfolio:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to update portfolio' });
    }
  }

  @Delete(':id')
  async deletePorfolioById(
    @Param('id') id: string,
    @Body() deletedPortfolio: PortfolioEntry,
    @Res() res: Response,
  ) {
    try {
      const deletedPortfolio =
        await this.portfolioService.deletePorfolioById(id);
      if (!deletedPortfolio) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: `No porfolio foud with this id: ${id}` });
      }
      return res.status(HttpStatus.OK).json(deletedPortfolio);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to delete porfolio' });
    }
  }

  @Put('/toggle/:id')
  async showPorfolio(@Param('id') id: string, @Res() res: Response) {
    try {
      const portfolio = await this.portfolioService.toggleIsHiddenPorfolio(id);
      console.log(portfolio);
      if (!portfolio) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: `No porfolio found with the id: ${id}` });
      }

      return res.status(HttpStatus.OK).json(portfolio);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to hide portfolio' });
    }
  }
}
