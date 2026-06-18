import { Router } from "express";
import { PodaControle } from "../controle/poda.controle";

const router = Router();
const controle = new PodaControle();

router.post("/poda", controle.cadastrar);
router.get("/poda", controle.listar);
router.get("/poda/:id", controle.buscar);
router.delete("/poda/:id", controle.deletar);
router.put("/poda/:id", controle.atualizar);

export default router;
