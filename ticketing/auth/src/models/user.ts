import mongoose from "mongoose";
import { Password } from "../services/password";

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  //is Modified returns true even at user creation and on any further updates
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrsType) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocType, UserModelType>("User", userSchema);

export { User };
