import { Router } from "express";
import { tweetsController } from "./tweets.controller";

const router = Router();

router.post(
  "/",
  tweetsController.validateCreateTweet,
  tweetsController.createTweet
);

export const tweetsRouter = router;
