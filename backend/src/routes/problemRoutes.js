import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createProblem,
  getAllProblems,
  getProblemById,
  getProblemByTitle,
  runTestCases,
} from "../controllers/problemController.js";

const router = express.Router();

router.post("/", protectRoute, createProblem);
router.get("/", getAllProblems);
router.get("/:id", getProblemById);
router.get("/title/:title", getProblemByTitle);
router.post("/test", protectRoute, runTestCases);

export default router;