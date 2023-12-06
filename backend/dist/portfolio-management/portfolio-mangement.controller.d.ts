import { PortfolioMangementService } from './portfolio-mangement.service';
import { PortfolioEntry } from './Schemas/portfolio.schema';
import { Response } from 'express';
export declare class PortfolioMangementController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioMangementService);
    createPortfolioEntry(portfolioEntry: PortfolioEntry, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllPortfolios(res: Response): Promise<Response<any, Record<string, any>>>;
    getPorfolioById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePortfolioById(id: string, updatedPortfolio: PortfolioEntry, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePorfolioById(id: string, deletedPortfolio: PortfolioEntry, res: Response): Promise<Response<any, Record<string, any>>>;
    showPorfolio(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
