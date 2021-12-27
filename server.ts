import express, {Request,Response,NextFunction} from 'express'
import db from './config/database.config'
import {v4 as uuidv4} from 'uuid'
import { TodoInstance } from './model'
import TodoValidator from './validator'
import {validationResult} from 'express-validator'
import Middleware from './middleware'
import TodoController from './controller'

db.sync().then(()=> {
    console.log('connect to db')
})

const app = express()
const port = 9000

app.use(express.json())

app.post("/create", TodoValidator.checkCreateTodo(), Middleware.handleValidationError,TodoController.create)

app.get('/read', TodoValidator.checkReadTodo(), Middleware.handleValidationError,TodoController.read)


app.get('/read:id',TodoValidator.checkIdParam(), Middleware.handleValidationError,TodoController.readById)

app.put('/update/:id',TodoValidator.checkIdParam(), Middleware.handleValidationError,TodoController.update)

app.delete('/delete/:id',TodoValidator.checkIdParam(), Middleware.handleValidationError,TodoController.delete)



app.listen(port, ()=> {
    console.log('server is running on port' + port)
})