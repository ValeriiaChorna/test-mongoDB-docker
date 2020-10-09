import { tweetsModel } from "./tweets.model";
import { createControllerProxy } from "../helpers/controllerProxy";
import { ValidationError } from "../helpers/errorConstructors";
import Joi from "joi";

class TweetsController {
  async createTweet(req, res, next) {
    try {
      const newTweet = await tweetsModel.createNewTweets({
        ...req.body,
      });
      return res.status(201).json(newTweet);
    } catch (err) {
      next(err);
    }
  }

  validateCreateTweet(req, res, next) {
    const tweetRules = Joi.object({
      nameAuthor: Joi.string().required(),
      text: Joi.string().required(),
      timeCreation: Joi.string().required(),
    });
    const validationResult = Joi.validate(req.body, tweetRules);
    if (validationResult.error) {
      throw new ValidationError("missing required name field");
    }
    next();
  }
}

export const tweetsController = createControllerProxy(new TweetsController());
