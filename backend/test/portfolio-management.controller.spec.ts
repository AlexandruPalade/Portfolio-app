import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { PortfolioEntry } from 'src/portfolio-management/Schemas/portfolio.schema';
import { PortfolioMangementController } from 'src/portfolio-management/portfolio-mangement.controller';
import { PortfolioMangementService } from 'src/portfolio-management/portfolio-mangement.service';

describe('PortfolioMangementController', () => {
  let controller: PortfolioMangementController;
  let service: PortfolioMangementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioMangementController],
      providers: [PortfolioMangementService],
    }).compile();

    controller = module.get<PortfolioMangementController>(
      PortfolioMangementController,
    );
    service = module.get<PortfolioMangementService>(PortfolioMangementService);
  });

  describe('createPortfolioEntry', () => {
    it('should create a portfolio entry', async () => {
      const mockPortfolio: PortfolioEntry = {
        _id: '1',
        title: 'title',
        description: 'description',
        imageUrl: 'https://picsum.photos/200/300',
        isHidden: false,
        customerWebsite: 'https://customerwebsite.com"',
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(service, 'createPortfolio').mockResolvedValue(mockPortfolio);

      await controller.createPortfolioEntry(
        mockPortfolio,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPortfolio);
    });

    it('should handle duplicate portfolio entries', async () => {
      const mockPortfolio: PortfolioEntry = {
        _id: '1',
        title: 'title',
        description: 'description',
        imageUrl: 'https://picsum.photos/200/300',
        isHidden: false,
        customerWebsite: 'https://customerwebsite.com"',
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(service, 'createPortfolio').mockRejectedValue({ code: 11000 });

      await controller.createPortfolioEntry(
        mockPortfolio,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error:
          'Duplicate title or description. Please provide a unique description or title.',
      });
    });
  });

  describe('getAllPortfolios', () => {
    it('should get all portfolios', async () => {
      const mockPortfolios: PortfolioEntry[] = [
        {
          _id: '1',
          title: 'Portfolio 1',
          description: 'Description 1',
          imageUrl: '',
          isHidden: false,
          customerWebsite: 'http://example.com/portfolio1',
        },
        {
          _id: '2',
          title: 'Portfolio 2',
          description: 'Description 2',
          imageUrl: '',
          isHidden: true,
          customerWebsite: 'http://example.com/portfolio2',
        },
      ];
      jest.spyOn(service, 'getAllPortfolios').mockResolvedValue(mockPortfolios);

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await controller.getAllPortfolios(mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPortfolios);
    });
  });

  describe('getPorfolioById', () => {
    it('should get a portfolio by ID', async () => {
      const mockPortfolioId = '1';
      const mockPortfolio: PortfolioEntry = {
        _id: mockPortfolioId,
        title: 'Mock Portfolio',
        description: 'Description of the mock portfolio',
        imageUrl: 'https://example.com/image.jpg',
        isHidden: false,
        customerWebsite: 'https://customerwebsite.com"',
      };

      jest.spyOn(service, 'getPorfolioById').mockResolvedValue(mockPortfolio);

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await controller.getPorfolioById(
        mockPortfolioId,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPortfolio);
    });

    it('should handle when no portfolio is found', async () => {
      const nonExistentPortfolioId = '2';

      jest.spyOn(service, 'getPorfolioById').mockResolvedValue(null);

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await controller.getPorfolioById(
        nonExistentPortfolioId,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'No portfolio found',
      });
    });

    it('should handle internal server errors', async () => {
      const mockPortfolioId = '1';

      jest
        .spyOn(service, 'getPorfolioById')
        .mockRejectedValue(new Error('Test error'));

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.getPorfolioById(
        mockPortfolioId,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });
  });

  describe('updatePortfolioById', () => {
    it('should update a portfolio by id', async () => {
      const mockPortfolioId = '1';
      const updatedMockPortfolio: PortfolioEntry = {
        _id: mockPortfolioId,
        title: 'Updated Title',
        description: 'Updated Description',
        imageUrl: 'https://example.com/updated-image.jpg',
        isHidden: false,
        customerWebsite: 'https://updated-customerwebsite.com"',
      };

      jest
        .spyOn(service, 'updatePorfolioById')
        .mockRejectedValue(new Error('Test error'));

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.updatePortfolioById(
        mockPortfolioId,
        updatedMockPortfolio,
        mockResponse as Response,
      );

      expect(mockResponse.json).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedMockPortfolio);

      it('should handle when the updated title already exists', async () => {
        const mockPortfolioId = '1';
        const existingPortfolio: PortfolioEntry = {
          _id: '2',
          title: 'Updated Title',
          description: 'Some Description',
          imageUrl: 'https://example.com/image.jpg',
          isHidden: false,
          customerWebsite: 'https://customerwebsite.com"',
        };

        const updatedMockPortfolio: PortfolioEntry = {
          _id: mockPortfolioId,
          title: 'Updated Title',
          description: 'Updated Description',
          imageUrl: 'https://example.com/updated-image.jpg',
          isHidden: false,
          customerWebsite: 'https://updated-customerwebsite.com"',
        };

        jest
          .spyOn(service, 'getPortfolioByTitle')
          .mockResolvedValue(existingPortfolio);

        const mockResponse: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        await controller.updatePortfolioById(
          mockPortfolioId,
          updatedMockPortfolio,
          mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(
          HttpStatus.BAD_REQUEST,
        );
        expect(mockResponse.json).toHaveBeenCalledWith({
          error: 'This title already exists',
        });
      });

      it('should handle when no portfolio is found with the given id', async () => {
        const nonExistentPortfolioId = 'nonExistentPortfolioId';

        jest.spyOn(service, 'getPortfolioByTitle').mockResolvedValue(null);
        jest.spyOn(service, 'updatePorfolioById').mockResolvedValue(null);

        const mockResponse: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        await controller.updatePortfolioById(
          nonExistentPortfolioId,
          {
            _id: '',
            title: '',
            description: '',
            imageUrl: '',
            isHidden: false,
            customerWebsite: '',
          },
          mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
        expect(mockResponse.json).toHaveBeenCalledWith({
          error: `No portfolio found with ID: ${nonExistentPortfolioId}`,
        });
      });

      it('should handle internal server errors', async () => {
        const mockPortfolioId = '1';

        jest
          .spyOn(service, 'getPorfolioById')
          .mockRejectedValue(new Error('Test error'));

        const mockResponse: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        await controller.getPorfolioById(
          mockPortfolioId,
          mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        expect(mockResponse.json).toHaveBeenCalledWith({
          error: 'Internal server error',
        });
      });
    });
  });

  describe('deletPortfolioById', () => {
    it('should delete portfolio by id', async () => {
      const mockPortfolioId = '1';
      const deletedPortfolio: PortfolioEntry = {
        _id: mockPortfolioId,
        title: 'Deleted Portfolio',
        description: 'Some Description',
        imageUrl: 'https://example.com/image.jpg',
        isHidden: false,
        customerWebsite: 'https://customerwebsite.com"',
      };

      jest
        .spyOn(service, 'deletePorfolioById')
        .mockResolvedValue(deletedPortfolio);

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.deletePorfolioById(
        mockPortfolioId,
        deletedPortfolio,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenLastCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(deletedPortfolio);
    });

    it('should handle when no portfolio found with the given id', async () => {
      const nonExistentPortfolioId = 'nonExistentPortfolioId';

      jest
        .spyOn(service, 'deletePorfolioById')
        .mockRejectedValue(new Error('Test error'));

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.deletePorfolioById(
        nonExistentPortfolioId,
        {
          _id: '',
          title: '',
          description: '',
          imageUrl: '',
          isHidden: false,
          customerWebsite: '',
        },
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: `No portfolio found with ID: ${nonExistentPortfolioId}`,
      });
    });

    it('should handle internal server errors', async () => {
      jest
        .spyOn(service, 'deletePorfolioById')
        .mockRejectedValue(new Error('Test error'));

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.deletePorfolioById(
        '1',
        {
          _id: '',
          title: '',
          description: '',
          imageUrl: '',
          isHidden: false,
          customerWebsite: '',
        },
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to delete portfolio',
      });
    });
  });

  describe('showPorfolio', () => {
    it('should toggle the portfolio to show and return it', async () => {
      const mockPortfolioId = '1';
      const toggledPortfolio: PortfolioEntry = {
        _id: mockPortfolioId,
        title: 'Toggled Portfolio',
        description: 'Some Description',
        imageUrl: 'https://example.com/image.jpg',
        isHidden: false,
        customerWebsite: 'https://customerwebsite.com"',
      };

      jest
        .spyOn(service, 'toggleIsHiddenPorfolio')
        .mockResolvedValue(toggledPortfolio);

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.showPorfolio(mockPortfolioId, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenNthCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(toggledPortfolio);
    });

    it('should handle when no portfolio found with the given id', async () => {
      const nonExistentPortfolioId = 'nonExistentPortfolioId';

      jest
        .spyOn(service, 'toggleIsHiddenPorfolio')
        .mockRejectedValue(new Error('Test error'));

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.showPorfolio(
        nonExistentPortfolioId,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: `No portfolio found with ID: ${nonExistentPortfolioId}`,
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
