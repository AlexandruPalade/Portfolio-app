/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { PortfolioEntry, PortfolioEntryDocument } from './Schemas/portfolio.schema';
import { Model } from 'mongoose';
export declare class PortfolioMangementService {
    private readonly portfolioModel;
    constructor(portfolioModel: Model<PortfolioEntryDocument>);
    createPortfolio(portfolioEntry: PortfolioEntry): Promise<PortfolioEntry>;
    getAllPortfolios(): Promise<PortfolioEntry[]>;
    getPorfolioById(id: string): Promise<PortfolioEntry>;
    updatePorfolioById(id: string, portfolio: PortfolioEntry): Promise<PortfolioEntry | null>;
    getPortfolioByTitle(title: string): Promise<PortfolioEntry | null>;
    deletePorfolioById(id: string): Promise<PortfolioEntry | null>;
    toggleIsHiddenPorfolio(id: string): Promise<PortfolioEntry>;
}
