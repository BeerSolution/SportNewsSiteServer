import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { IRequestBody } from 'types/userTypes.js';
import PropagateError from 'decorators/PropagateError.decorator.js';
import { authService } from 'services/index.js';

class AuthController {
    async registration(req: Request, res: Response) {
        const user = <IRequestBody>req.body;
        const erorrs = validationResult(req);
        const token = await authService.registrationUser(user, erorrs);
        return res.json(token);
    }

    @PropagateError
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await authService.loginUser(email, password);
        return res.json(token);
    }

    async getUser(req: Request, res: Response) {
        const user = await authService.getUserById(req.user.id);
        return res.json(user);
    }

    async getUsers(req: Request, res: Response) {
        const users = await authService.getAllUsers();
        return res.json(users);
    }
}

export default new AuthController();
function loginUser(email: any, password: any) {
    throw new Error('Function not implemented.');
}