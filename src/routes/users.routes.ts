import { Router } from 'express'
import multer from 'multer'
import 'express-async-errors'
import CreateUserService from '../services/CreateUserService'
import verifyAuthentication from '../middleware/verifyAuthentication'
import uploadConfig from '../config/upload'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body
	const createUserService = new CreateUserService()
	const user = await createUserService.run({
		name,
		email,
		password
	})

	return response.status(201).json(user)
})

usersRouter.patch(
	'/avatar',
	verifyAuthentication,
	upload.single('avatar'),
	async (request, response) => {
		const updateAvatar = new UpdateUserAvatarService()

		const user = await updateAvatar.run({
			user_id: request.user.id,
			fileName: request.file.filename
		})

		delete user.password

		return response.json(user)
	}
)

export default usersRouter
