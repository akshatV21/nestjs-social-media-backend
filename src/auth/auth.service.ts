import { Injectable, BadRequestException } from '@nestjs/common'
import { UserRepository } from 'src/database/repositories'
import { RegisterDto } from './dtos/register.dto'

@Injectable()
export class AuthService {
  constructor(private readonly UserRepository: UserRepository) {}

  async register(registerDto: RegisterDto) {
    const emailExists = await this.UserRepository.exists({ email: registerDto.email })
    if (emailExists) throw new BadRequestException('Provided email already exists.')

    const user = await this.UserRepository.create(registerDto)
    const { password, ...result } = user.toJSON()

    return result
  }
}
