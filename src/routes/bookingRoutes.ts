import { Router } from "express";
import { bookTable } from "../controllers/bookingController";

const router = Router();

router.post("/reservation", bookTable);

export default router;
