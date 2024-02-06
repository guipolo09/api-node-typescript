import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Olá, Dev!");
});

router.post("/test", (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
