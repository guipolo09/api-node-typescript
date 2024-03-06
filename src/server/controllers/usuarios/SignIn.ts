import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UsuariosProvider } from './../../database/providers/usuarios';
import { validation } from '../../shared/middlewares';
import { IUsuario } from './../../database/models';
import { JWTService, PasswordCrypto } from '../../shared/services';


interface IBodyProps extends Omit<IUsuario, "id" | "nome"> { }

export const signInValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6),
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, senha } = req.body

    const usuario = await UsuariosProvider.getByEmail(email);
    if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
    errors: {
        default: "Email ou senha são inválidos"
    }
    });
}
    const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha)
    if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
    errors: {
        default: "Email ou senha são inválidos"
    }
    })
    } else {

        const accessToken = JWTService.sign({ uid: usuario.id})
        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: "Erro ao gerar token"
        }
        })

        }

        return res.status(StatusCodes.OK).json({ accessToken })
    }
};

