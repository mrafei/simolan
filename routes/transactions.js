import express from "express";
import authMiddleware from "../middlewares/auth";
import { create } from "../controllers/transaction";
const router = express.Router();
/* GET users listing. */

router.post("/", [authMiddleware], create);
export default router;
