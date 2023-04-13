import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Material } from './entities/material.entity';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateMaterialDto) {
    const newMaterial = new Material();
    newMaterial.type = inputs.type;
    newMaterial.quantity = inputs.quantity;
    newMaterial.state_of_material = inputs.state_of_material;
    newMaterial.delivery_note = inputs.delivery_note;
    newMaterial.vehicle = inputs.vehicle;
    newMaterial.exit_date = new Date(inputs.exit_date);
    newMaterial.release_date = new Date(inputs.release_date);
    const user = await this.user.getWhere('id', inputs.driver_id);
    if (user) {
      newMaterial.driver = user;
    }

    return this.materialRepo
      .save(newMaterial)
      .then((entity) => this.getWhere('id', (entity as Material).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.materialRepo.find({
      order: { release_date: 'DESC' },
    });
  }

  async update(materialId: string, inputs: UpdateMaterialDto) {
    const foundMaterial = await this.getWhere('id', materialId);
    if (inputs.type) foundMaterial.type = inputs.type;
    if (inputs.quantity) foundMaterial.quantity = inputs.quantity;
    if (inputs.state_of_material) foundMaterial.state_of_material = inputs.state_of_material;
    if (inputs.delivery_note) foundMaterial.delivery_note = inputs.delivery_note;
    if (inputs.vehicle) foundMaterial.vehicle = inputs.vehicle;
    if (inputs.exit_date) foundMaterial.exit_date = new Date(inputs.exit_date);
    if (inputs.release_date) foundMaterial.release_date = new Date(inputs.release_date);
    if (inputs.driver_id) {
      const user = await this.user.getWhere('id', inputs.driver_id);
      if (user) {
        foundMaterial.driver = user;
      }
    }

    await this.materialRepo.save(foundMaterial);
    return { updated: true };
  }

  async delete(materialId: string) {
    const foundMaterial = await this.getWhere('id', materialId);
    foundMaterial.deleted_at = new Date();
    await this.materialRepo.save(foundMaterial);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Material,
    value: any,
    throwsException = true,
  ): Promise<Material | null> {
    return this.materialRepo
      .findOne({ where: { [key]: value } })
      .then((material) => {
        if (!material && throwsException) {
          return Promise.reject(
            new NotFoundException(`No material found with ${key} ${value}`),
          );
        }
        return Promise.resolve(material ? material : null);
      });
  }
}