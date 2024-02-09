import { Router } from "express";
//import { StatusCodes } from "http-status-codes";

import { CidadesController } from "../controllers/cidades";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Olá, Dev!");
});

router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);
router.get(
  "/cidades/:id",
  CidadesController.getByIdValidation,
  CidadesController.getById
);
router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create
);
router.put(
  "/cidades/:id",
  CidadesController.updateValidation,
  CidadesController.updateById
);
export { router };
