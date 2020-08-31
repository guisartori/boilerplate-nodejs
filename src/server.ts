import express from 'express'
import routes from './routes'

const app = express()

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('App started'))
