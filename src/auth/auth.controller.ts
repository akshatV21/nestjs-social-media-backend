import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dtos/register.dto'
import { HttpSuccessResponse } from 'src/utils/types'
import { LoginDto } from './dtos/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async httpRegister(@Body() registerDto: RegisterDto): HttpSuccessResponse {
    const user = await this.authService.register(registerDto)
    return { success: true, message: 'User registered successfully.', data: { user } }
  }

  @Post('login')
  async httpLogin(@Body() loginDto: LoginDto): HttpSuccessResponse {
    const res = await this.authService.login(loginDto)
    return { success: true, message: 'User logged in successfully.', data: res }
  }
}
