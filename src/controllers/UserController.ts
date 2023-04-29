import { Request, Response } from 'express';
import { CreatePreRegisterUser } from '../services/CreatePreRegisterUserService';
import { AuthenticatedUrl } from '../services/AuthenticatedUrlService';
import { FindUserService } from '../services/FindUserService';


class UserController {
    async register(req: Request, res: Response): Promise<Response> {
        const { body } = req
        const createPreRegisterUser = new CreatePreRegisterUser()
        const response = await createPreRegisterUser.execute(body)
        return res.status(201).json(response)
    }

    async getAuthenticatedUrl(req: Request, res: Response): Promise<Response> {
        const { body } = req
        const authenticatedUrlService = new AuthenticatedUrl()
        const response = await authenticatedUrlService.execute(body)
        return res.status(201).json(response)
    }

    async find(req: Request, res: Response): Promise<Response> {
        const { params } = req
        const findUserService = new FindUserService()
        const response = await findUserService.execute(params)
        return res.status(200).json(response)
    }
}

export { UserController }