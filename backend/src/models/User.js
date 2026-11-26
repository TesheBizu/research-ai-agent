import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [100, "Name cannot exceed 100 characters."]
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address."
      ]
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required."],
      select: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    settings: {
      defaultMode: {
        type: String,
        enum: ["quick", "standard", "deep"],
        default: "standard"
      },
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system"
      }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform(_doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      }
    }
  }
);

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    settings: this.settings,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

const User = mongoose.model("User", userSchema);

export default User;

