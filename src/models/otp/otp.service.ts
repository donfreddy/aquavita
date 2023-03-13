import { NotFoundResponse } from './../../common/helpers/api-response';
import { EnumOtpRaison } from '../../common/helpers/enum.helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateOtpCode } from 'src/common/helpers/helper';
import { Repository, UpdateResult } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
  ) {}

  /**
   * Create new OTP code for user
   *
   * @param {User} user {User} The user that owns the OTP code
   * @param {EnumOtpRaison} raison It's from {@link EnumOtpRaison} enum type.
   *
   * @returns {Promise<Otp>}
   */
  async create(user: User, raison?: EnumOtpRaison): Promise<Otp> {
    const now = new Date();
    const expiredAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later

    const otp = new Otp();
    otp.code = generateOtpCode();
    otp.user = user;
    otp.reason = raison ?? null;
    otp.created_at = now;
    otp.expired_at = expiredAt;
    return await this.otpRepo.save(otp);
  }

  /**
   * Get OTP code by key and value
   *
   * @param {keyof Otp} key The key of the OTP object
   * @param {any} value The value of the OTP object
   * @param {EnumOtpRaison} reason It's from {@link EnumOtpRaison} enum type.
   *
   * @returns {Promise<Otp | null>}
   */
  async getWhere(
    key: keyof Otp,
    value: any,
    reason?: EnumOtpRaison,
  ): Promise<Otp | null> {
    if (reason) {
      return this.otpRepo.findOne({ where: { [key]: value, reason } });
    }
    return this.otpRepo.findOne({ where: { [key]: value } });
  }

  /**
   * Check if an OTP (One Time Password) code is expired.
   *
   * @param otpCode Otp object
   *
   * @returns {boolean} True if expired, false otherwise
   */
  async isExpired(otp: Otp): Promise<boolean> {
    const { created_at, expired_at } = otp;

    const diffNow = Date.now() - created_at.getTime();
    const diff = expired_at.getTime() - created_at.getTime();

    return Math.round(diffNow / 60000) > Math.round(diff / 60000);
  }

  async update(otp: Otp): Promise<UpdateResult> {
    return await this.otpRepo.update(otp.id, { is_used: true });
  }

  async delete(otp: Otp): Promise<Otp> {
    return await this.otpRepo.remove(otp);
  }
}
