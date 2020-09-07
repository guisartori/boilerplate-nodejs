import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '../config/auth'
import AppError from '../errors/AppError'

interface TokenPayload {
	iat: number
	exp: number
	sub: string
}

export default function verifyAuthentication(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	const authHeader = request.headers.authorization

	if (!authHeader) {
		throw new AppError('Atenção! O token JWT está faltando.', 401)
	}

	const [, token] = authHeader.split(' ')

	try {
		const decoded = verify(token, auth.jwt.secret)

		const { sub } = decoded as TokenPayload

		request.user = {
			id: sub
		}

		return next()
	} catch {
		throw new AppError('Token JWT inválido.', 401)
	}
}
