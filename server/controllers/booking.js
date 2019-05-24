const Booking = require("../models/booking");
const Rental = require("../models/rental");

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;
  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exac((err, rental) => {
      if (err) {
        return res.status(422).send({ errors: "Something went worngs!" });
      }
    });

  res.json({ created: "done" });
};
