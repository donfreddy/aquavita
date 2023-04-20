import { Injectable, NotFoundException } from '@nestjs/common';
import { Presence } from './entities/presence.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePresenceDto } from './dto/presence.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private readonly presenceRepo: Repository<Presence>,
    private readonly userService: UserService,
  ) {
  }

  async create(inputs: CreatePresenceDto) {
    const newPresence = new Presence();

    if (inputs.is_visitor) {
      newPresence.is_visitor = inputs.is_visitor;
      newPresence.visitor_name = inputs.visitor_name;
      newPresence.visitor_phone_number = inputs.visitor_phone_number || null;
    }
    if (inputs.motif) newPresence.motif = inputs.motif;
    newPresence.status = inputs.status;
    newPresence.date = new Date(inputs.date);
    if (inputs.user_id) {
      newPresence.user = await this.userService.getWhere('id', inputs.user_id);
    }

    return this.presenceRepo
      .save(newPresence)
      .then((entity) => this.getWhere('id', (entity as Presence).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.presenceRepo.find({
      order: { date: 'DESC' },
    });
  }

  async updateArchiveStatus(presenceId: string) {
    const foundPresence = await this.getWhere('id', presenceId);
    foundPresence.archived = !foundPresence.archived;
    await this.presenceRepo.save(foundPresence);
    return { updated: true };
  }

  async delete(presenceId: string) {
    const foundPresence = await this.getWhere('id', presenceId);
    foundPresence.deleted_at = new Date();
    await this.presenceRepo.save(foundPresence);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Presence,
    value: any,
    throwsException = true,
  ): Promise<Presence | null> {
    return this.presenceRepo
      .findOne({ where: { [key]: value } })
      .then((presence) => {
        if (!presence && throwsException) {
          throw new NotFoundException();
        }
        return presence;
      })
      .catch((error) => Promise.reject(error));
  }
}
