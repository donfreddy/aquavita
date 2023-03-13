import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "src/common/interfaces/auth.interface";
import { configService } from "src/config/config.service";
import { User } from "src/models/user/entities/user.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getJWT().secretKey,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload, done: any): Promise<User> {
    const user = await this.auth.validateUser(payload);
    if (!user) {
      done(new UnauthorizedException(), false);
    }
    return done(null, user);
  }
}