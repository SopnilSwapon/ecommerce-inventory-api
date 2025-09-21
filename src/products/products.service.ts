import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findById(
      createProductDto.categoryId,
    );
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }

    return this.productRepository.create(createProductDto);
  }

  async findAll(query: ProductQueryDto) {
    const { products, total } = await this.productRepository.findAll(query);
    const totalPages = Math.ceil(total / query.limit);

    return {
      products,
      pagination: {
        currentPage: query.page,
        totalPages,
        totalItems: total,
        itemsPerPage: query.limit,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findById(
        updateProductDto.categoryId,
      );
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateProductDto.categoryId} not found`,
        );
      }
    }

    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.delete(id);
    return { message: 'Product deleted successfully' };
  }

  async search(keyword: string, page: number = 1, limit: number = 10) {
    const { products, total } = await this.productRepository.search(
      keyword,
      page,
      limit,
    );
    const totalPages = Math.ceil(total / limit);

    return {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
      },
    };
  }
}
