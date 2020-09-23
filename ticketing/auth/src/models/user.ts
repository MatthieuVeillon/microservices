import mongoose from "mongoose";

//AN interface that describes the properties to declare the new user
interface UserAttrsType {
  email: string;
  password: string;
}

// an interface that describe properties that a user Model has
interface UserModelType extends mongoose.Model<UserDocType> {
  build(attrs: UserAttrsType): UserDocType;
}

//an interface that describes the properties that a user document has
interface UserDocType extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrsType) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocType, UserModelType>("User", userSchema);

new User({
  email: "",
  password: "",
});

export { User };
