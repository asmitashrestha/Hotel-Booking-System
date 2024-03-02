import { Request, Response , NextFunction } from "express";
import Tour, { TourType } from "../model/TourModel";
import { BookingType } from "../shared/types";

export const userBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tours = await Tour.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = tours.map((tour) => {
      const userBookings = tour.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const tourWithUserBookings: TourType = {
        ...tour.toObject(),
        bookings: userBookings,
      };

      return tourWithUserBookings;
    });

    res.status(200).send(results)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, unable to fetch bookings",
    });
  }
};

