import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../users/repositories/user.repository';

interface IJwtPayload {
  sub: number;
  email: string;
}
@Injectable()
// JWT strategy for validating tokens
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject for expired tokens
      ignoreExpiration: false,
      // Secret for validation
      secretOrKey: jwtSecret,
    });
  }

  // Validate user from JWT payload
  async validate(payload: IJwtPayload) {
    const user = await this.userRepository.findById(payload.sub);
    // Invalid token if user not found
    if (!user) {
      throw new UnauthorizedException();
    }
    // Attach to request.user
    return { userId: user.id, email: user.email };
  }
}
