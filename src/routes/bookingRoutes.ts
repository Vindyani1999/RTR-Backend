import { Router } from "express";
import * as bookingController from "../controllers/bookingController";

const router = Router();

router.post("/reservation", bookingController.makeReservation);
router.post("/update-expired", bookingController.handleExpiredBookings);
router.get("/all", bookingController.getAllBookings);

export default router;
