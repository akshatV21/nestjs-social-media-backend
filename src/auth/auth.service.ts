import { Injectable, BadRequestException } from '@nestjs/common'
import { UserRepository } from 'src/database/repositories'
import { RegisterDto } from './dtos/register.dto'
import { LoginDto } from './dtos/login.dto'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly UserRepository: UserRepository,
  ) {}

  async register(registerDto: RegisterDto) {
    const emailExists = await this.UserRepository.exists({ email: registerDto.email })
    if (emailExists) throw new BadRequestException('Provided email already exists.')

    const user = await this.UserRepository.create(registerDto)
    const { password: _, ...result } = user.toJSON()

    return result
  }

  async login({ email, password }: LoginDto) {
    const registeredUser = await this.UserRepository.findOne({ email }, {}, { lean: true })
    if (!registeredUser) throw new BadRequestException('Provided email does not exist.')

    const passwordMatches = compareSync(password, registeredUser.password)
    if (!passwordMatches) throw new BadRequestException('Provided password is incorrect.')

    const token = sign({ id: registeredUser._id }, this.configService.get('JWT_SECRET'), { expiresIn: '24h' })
    const { password: _, ...user } = registeredUser

    return { user, token }
  }
}
