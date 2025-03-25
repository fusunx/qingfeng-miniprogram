import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class MysqlBaseService<T> {
  constructor(protected repository: Repository<T>) {}
  async findAll() {
    return this.repository.find();
  }
  async find(options?: FindManyOptions<T>) {
    return await this.repository.find(options);
  }
  async findOne(findOptions: FindOneOptions<T>) {
    return await this.repository.findOne(findOptions);
  }

  async findBy(findOptions: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
    return await this.repository.findBy(findOptions);
  }

  async create(createDto?: DeepPartial<T>) {
    const entity = this.repository.create(createDto);

    return await this.repository.save(entity);
  }

  async update(id: number, updateDto: QueryDeepPartialEntity<T>) {
    return await this.repository.update(id, updateDto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  async save(entity: T) {
    return await this.repository.save(entity);
  }
}

// save 可以实现插入和更新 有ID则更新，没ID则插入
// create 只能把一个普通对象变成实体，不会操作数据库
// update 只能更新
// insert 插入
