import { Router, /* RequestHandler */ } from "express";
import { UserController } from "./controllers/UserController";
import { RegisterUserValidation } from "./validations/RegisterUserValidation";
import { GetAuthenticatedUrlValidation } from "./validations/GetAuthenticatedUrlValidation";

const router = Router()
const userController = new UserController()
const registerUserValidation = new RegisterUserValidation()
const getAuthenticatedUrlValidation = new GetAuthenticatedUrlValidation()

router.post('/createPreRegisterUser', registerUserValidation.validate, userController.register)
router.post('/authenticatedUrl', getAuthenticatedUrlValidation.validate, userController.getAuthenticatedUrl)
router.get('/users/:UserName', userController.find)
router.get('/users', userController.find)


export { router }