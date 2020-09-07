import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body
		const createUserService = new CreateUserService()
		const user = await createUserService.run({
			name,
			email,
			password
		})

		return response.status(201).json(user)
	} catch (error) {
		console.log(error)
		return response.status(400).json({ error: error.message })
	}
})

export default usersRouter
