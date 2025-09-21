import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['products'],
    });
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async update(
    id: number,
    categoryData: Partial<Category>,
  ): Promise<Category | null> {
    await this.categoryRepository.update(id, categoryData);
    return this.findById(id);
  }
  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async findByName(name: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { name } });
  }

  async hasProducts(id: number): Promise<boolean | null> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    return category && category.products.length > 0;
  }
}
