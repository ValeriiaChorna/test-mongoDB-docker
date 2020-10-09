import mongoose, { Schema } from "mongoose";

const tweetsSchema = new Schema({
  nameAuthor: { type: String, require: true, maxlength: 255, minlength: 3 },
  text: { type: String, require: true },
  timeCreation: { type: String, require: true },
});

tweetsSchema.statics.createNewTweets = createNewTweets;

async function createNewTweets(newTweetsParams) {
  return this.create(newTweetsParams);
}

export const tweetsModel = mongoose.model("tweets", tweetsSchema);
