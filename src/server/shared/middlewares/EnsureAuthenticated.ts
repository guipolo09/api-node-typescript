import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";



export const ensureAuthenticated: RequestHandler = async ( req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autorizado'
            }
        })
    } 

    const [type, token] = authorization.split(" ")
    //console.log(type, token)
    
    if (type !== "Bearer") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Não autenticado'
            }
        })
    } 
    
    const jwtData = JWTService.verify(token)
    if (jwtData === "JWT_SECRET_NOT_FOUND") {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao verificar token'
            }
        })
    } else if (jwtData === "INVALID_TOKEN") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Token inválido'
            }
        })
    }

    //console.log(jwtData)
    req.headers.idUsuario = jwtData.uid.toString()
    return next()
}