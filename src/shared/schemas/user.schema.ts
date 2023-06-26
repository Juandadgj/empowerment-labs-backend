import { Schema } from "dynamoose";

export const UserSchema = new Schema({
  userId: {
    type: Number,
    hashKey: true,
  },
  name: {
    type: String,
  }
})

export default UserSchema;
