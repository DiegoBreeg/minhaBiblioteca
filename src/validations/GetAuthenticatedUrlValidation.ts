import { Request, Response, NextFunction } from 'express';
import { IUser } from '../database/models/User';
const { ObjectValidator } = require('object-validatordb')
const validator = new ObjectValidator()

class GetAuthenticatedUrlValidation {
    validate(req: Request, res: Response, next: NextFunction): Response | void {
        const body: IUser = req.body
        const rules = {
            FirstName: String,
            LastName: String,
            UserName: String,
        }
        console.log("Validation:", validator.validate(body, rules))
        if (!validator.validate(body, rules))
            return res.status(400).json({ message: 'Incorrect body Data' })

        req.body.FirstName = body.FirstName.toLowerCase()
        req.body.LastName = body.LastName.toLowerCase()
        req.body.UserName = body.UserName.toLowerCase()
        return next()
    }
}

export { GetAuthenticatedUrlValidation }