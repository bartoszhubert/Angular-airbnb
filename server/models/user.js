const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 charackters"],
    max: [32, "Too long, max is 32 characters"]
  },
  email: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 charackters"],
    max: [32, "Too long, max is 32 characters"],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 charackters"],
    max: [32, "Too long, max is 32 characters"]
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }]
});

userSchema.methods.isSamePassword = function(req) {
  return bcrypt.compareSync(req, this.password);
};

userSchema.pre("save", next => {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
