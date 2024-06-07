import { Request, Response, NextFunction } from "express";
import { func, ObjectSchema } from "joi";
import { responseErrorFormatter } from "./helpers/ErrorHanding";
import { HttpStatusCode } from "@/infra/helpers/HttpStatusCode";
import { BadRequestError } from "@/infra/helpers/Error";
import { decodeFromBase64 } from "@/infra/helpers/SecurityHelper";

//Validar a requisição
function validatePayload(schema: ObjectSchema, key: "body" | "params") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[key]);

    if (error) {
      const message = "Invalid payload";
      return res.status(400).json({ message, error: error.message });
    }

    next();
  };
}

//Validar o body da requisição
export function validateBody(schema: ObjectSchema) {
  return validatePayload(schema, "body");
}

//Validar os parametros da requisição
export function validateParams(schema: ObjectSchema) {
  return validatePayload(schema, "params");
}

//Validar se o token de autenticação foi enviado
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    const message = new BadRequestError("Missing authorization header");

    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json(responseErrorFormatter(message));
  }

  const token = req.headers.authorization.split(" ")[1];
  const user: any = decodeFromBase64(token);

  if (!user) {
    const message = new BadRequestError("Invalid token");

    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json(responseErrorFormatter(message));
  }

  next();
}
