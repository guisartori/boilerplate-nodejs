import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
	try {
		const { email, password } = request.body

		const authenticateUser = new AuthenticateUserService()

		const { user, token } = await authenticateUser.run({
			email,
			password
		})

		return response.status(201).json({ user, token })
	} catch (error) {
		return response.status(400).json({ error: error.message })
	}
})

export default sessionsRouter
