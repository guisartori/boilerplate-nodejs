import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/User'

interface RequestDTO {
	name: string
	email: string
	password: string
}
class CreateUserService {
	public async run({ name, email, password }: RequestDTO): Promise<User> {
		const usersRepository = getRepository(User)

		const checkUserExists = await usersRepository.findOne({
			where: { email }
		})

		if (checkUserExists) {
			throw new Error('Ops! Este email já está cadastrado... Tente outro.')
		}

		const hashedPassword = await hash(password, 8)

		const user = usersRepository.create({
			name,
			email,
			password: hashedPassword
		})

		await usersRepository.save(user)

		delete user.password

		return user
	}
}

export default CreateUserService
