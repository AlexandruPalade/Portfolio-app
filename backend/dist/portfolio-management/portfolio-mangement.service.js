"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioMangementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const portfolio_schema_1 = require("./Schemas/portfolio.schema");
const mongoose_2 = require("mongoose");
let PortfolioMangementService = class PortfolioMangementService {
    constructor(portfolioModel) {
        this.portfolioModel = portfolioModel;
    }
    async createPortfolio(portfolioEntry) {
        const newPortfolio = new this.portfolioModel(portfolioEntry);
        console.log(newPortfolio);
        return newPortfolio.save();
    }
    async getAllPortfolios() {
        const portfolios = this.portfolioModel.find().exec();
        return portfolios;
    }
    async getPorfolioById(id) {
        const porfolio = this.portfolioModel.findById(id).exec();
        return porfolio;
    }
    async updatePorfolioById(id, portfolio) {
        const updatedPortfolio = await this.portfolioModel
            .findOneAndUpdate({ _id: id }, portfolio, { new: true })
            .exec();
        return updatedPortfolio;
    }
    async getPortfolioByTitle(title) {
        return this.portfolioModel.findOne({ title }).exec();
    }
    async deletePorfolioById(id) {
        const deletedPortfolio = await this.portfolioModel
            .findOneAndDelete({ _id: id })
            .lean();
        if (!deletedPortfolio) {
            return null;
        }
        return deletedPortfolio;
    }
    async toggleIsHiddenPorfolio(id) {
        const porfolio = await this.portfolioModel.findById(id);
        if (!porfolio) {
            return null;
        }
        porfolio.isHidden = !porfolio.isHidden;
        return porfolio.save();
    }
};
exports.PortfolioMangementService = PortfolioMangementService;
exports.PortfolioMangementService = PortfolioMangementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(portfolio_schema_1.PortfolioEntry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PortfolioMangementService);
//# sourceMappingURL=portfolio-mangement.service.js.map