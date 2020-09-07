import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import User from '../models/User'
import upload from '../config/upload'
import AppError from '../errors/AppError'

interface RequestDTO {
	user_id: string
	fileName: string
}

class UpdateUserAvatarService {
	public async run({ user_id, fileName }: RequestDTO): Promise<User> {
		const userRepository = getRepository(User)

		const user = await userRepository.findOne(user_id)

		if (!user) {
			throw new AppError(
				'Apenas usuários autenticados podem trocar o avatar.',
				401
			)
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(upload.directory, user.avatar)
			const userAvatarExists = await fs.promises.stat(userAvatarFilePath)

			if (userAvatarExists) {
				await fs.promises.unlink(userAvatarFilePath)
			}
		}

		user.avatar = fileName

		await userRepository.save(user)

		return user
	}
}

export default UpdateUserAvatarService
