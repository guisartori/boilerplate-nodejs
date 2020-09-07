/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express'
import routes from './routes'
import 'reflect-metadata'
import './database'
import upload from './config/upload'
import AppError from './errors/AppError'

const app = express()

app.use(express.json())
app.use('/files', express.static(upload.directory))
app.use(routes)
app.use(
	(error: Error, request: Request, response: Response, next: NextFunction) => {
		if (error instanceof AppError) {
			return response.status(error.statusCode).json({
				status: 'error',
				message: error.message
			})
		}
		console.log(error)
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error'
		})
	}
)

app.listen(3333, () => console.log('App started'))
