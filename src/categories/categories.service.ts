import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findByName(
      createCategoryDto.name,
    );
    if (existingCategory) {
      throw new ConflictException('Category name already exists');
    }

    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll();
    return categories.map((category) => ({
      ...category,
      productCount: category.products.length,
      products: undefined, // Remove products from response
    }));
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findByName(
        updateCategoryDto.name,
      );
      if (existingCategory) {
        throw new ConflictException('Category name already exists');
      }
    }

    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const hasProducts = await this.categoryRepository.hasProducts(id);
    if (hasProducts) {
      throw new BadRequestException(
        'Cannot delete category with associated products',
      );
    }

    await this.categoryRepository.delete(id);
    return { message: 'Category deleted successfully' };
  }
}
