import { Schema } from "dynamoose";
import { v4 } from 'uuid';

export const UserSchema = new Schema({
  userId: {
    type: String,
    default: v4,
    hashKey: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  }
})

export default UserSchema;
