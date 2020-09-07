import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '../models/User'
import auth from '../config/auth'

interface RequestDTO {
	email: string
	password: string
}

interface ResponseDTO {
	user: User
	token: string
}

class AuthenticateUserService {
	public async run({ email, password }: RequestDTO): Promise<ResponseDTO> {
		const userRepository = getRepository(User)

		const user = await userRepository.findOne({ where: { email } })

		if (!user) {
			throw new Error('Email ou senha incorretos.')
		}

		const passwordMatch = await compare(password, user.password)
		if (!passwordMatch) {
			throw new Error('Email ou senha incorretos.')
		}

		delete user.password

		const token = sign({}, auth.jwt.secret, {
			subject: user.id,
			expiresIn: auth.jwt.expiresIn
		})

		return {
			user,
			token
		}
	}
}

export default AuthenticateUserService
