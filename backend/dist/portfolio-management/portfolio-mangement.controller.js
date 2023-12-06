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
exports.PortfolioMangementController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_mangement_service_1 = require("./portfolio-mangement.service");
const portfolio_schema_1 = require("./Schemas/portfolio.schema");
let PortfolioMangementController = class PortfolioMangementController {
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    async createPortfolioEntry(portfolioEntry, res) {
        try {
            const newPortfolio = await this.portfolioService.createPortfolio(portfolioEntry);
            console.log(portfolioEntry);
            return res.status(common_1.HttpStatus.OK).json(newPortfolio);
        }
        catch (error) {
            if (error.code === 11000) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    error: 'Duplicate title or description. Please provide a unique description or title.',
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: 'Failed to create portoflio' });
            }
        }
    }
    async getAllPortfolios(res) {
        try {
            const portfolios = await this.portfolioService.getAllPortfolios();
            if (!portfolios) {
                res.status(common_1.HttpStatus.NOT_FOUND).json({ error: 'No porfolios found' });
            }
            return res.status(common_1.HttpStatus.OK).json(portfolios);
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to fetch porfolios' });
        }
    }
    async getPorfolioById(id, res) {
        try {
            const porfolio = await this.portfolioService.getPorfolioById(id);
            if (!porfolio) {
                res.status(common_1.HttpStatus.NOT_FOUND).json({ error: 'No portfolio found' });
            }
            return res.status(common_1.HttpStatus.OK).json(porfolio);
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to fetch portfolio' });
        }
    }
    async updatePortfolioById(id, updatedPortfolio, res) {
        try {
            const existingPortfolio = await this.portfolioService.getPortfolioByTitle(updatedPortfolio.title);
            if (existingPortfolio && existingPortfolio._id !== id) {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({ error: 'This title already exists' });
            }
            const updated = await this.portfolioService.updatePorfolioById(id, updatedPortfolio);
            if (!updated) {
                return res
                    .status(common_1.HttpStatus.NOT_FOUND)
                    .json({ error: `No portfolio found with ID: ${id}` });
            }
            return res.status(common_1.HttpStatus.OK).json(updated);
        }
        catch (error) {
            console.error('Error updating portfolio:', error);
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to update portfolio' });
        }
    }
    async deletePorfolioById(id, deletedPortfolio, res) {
        try {
            const deletedPortfolio = await this.portfolioService.deletePorfolioById(id);
            if (!deletedPortfolio) {
                res
                    .status(common_1.HttpStatus.NOT_FOUND)
                    .json({ error: `No porfolio foud with this id: ${id}` });
            }
            return res.status(common_1.HttpStatus.OK).json(deletedPortfolio);
        }
        catch (error) {
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to delete porfolio' });
        }
    }
    async showPorfolio(id, res) {
        try {
            const portfolio = await this.portfolioService.toggleIsHiddenPorfolio(id);
            console.log(portfolio);
            if (!portfolio) {
                return res
                    .status(common_1.HttpStatus.NOT_FOUND)
                    .json({ error: `No porfolio found with the id: ${id}` });
            }
            return res.status(common_1.HttpStatus.OK).json(portfolio);
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to hide portfolio' });
        }
    }
};
exports.PortfolioMangementController = PortfolioMangementController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [portfolio_schema_1.PortfolioEntry, Object]),
    __metadata("design:returntype", Promise)
], PortfolioMangementController.prototype, "createPortfolioEntry", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioMangementController.prototype, "getAllPortfolios", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PortfolioMangementController.prototype, "getPorfolioById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, portfolio_schema_1.PortfolioEntry, Object]),
    __metadata("design:returntype", Promise)
], PortfolioMangementController.prototype, "updatePortfolioById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, portfolio_schema_1.PortfolioEntry, Object]),
    __metadata("design:returntype", Promise)
], PortfolioMangementController.prototype, "deletePorfolioById", null);
__decorate([
    (0, common_1.Put)('/toggle/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PortfolioMangementController.prototype, "showPorfolio", null);
exports.PortfolioMangementController = PortfolioMangementController = __decorate([
    (0, common_1.Controller)('portfolios'),
    __metadata("design:paramtypes", [portfolio_mangement_service_1.PortfolioMangementService])
], PortfolioMangementController);
//# sourceMappingURL=portfolio-mangement.controller.js.map