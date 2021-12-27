import {body,query,param} from 'express-validator'

class TodoValidator{
    checkCreateTodo(){
        return [
            body('title')
            .notEmpty()
            .withMessage('The title value should not be empty'),
            body('completed')
            .optional()
            .isBoolean()
            .withMessage('The value should be boolean')
            .isIn([0, false])
            .withMessage('The value should be 0 or false')
        ]
    }

    checkReadTodo() {
        return [
            query("limit").notEmpty().withMessage('The query limit should not be empty')
            .isInt({min:1, max:10}).withMessage("The limit value should be number and between 1 to 10"),
      
            query("offset").optional().isNumeric().withMessage("The value should be a number")
        ]
    }

    checkIdParam(){
        return [
            param("id").notEmpty().withMessage("The value should be not empty")
            .isUUID(4).withMessage("The value should be uuid v4")
        ]
    }
}

export default new TodoValidator()