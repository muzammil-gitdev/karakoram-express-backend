import bookingModel from "../models/bookingModel.js";

export async function getPassengers(req, res) {
  try {
    console.log(req.query);
    const obj = Object.assign({}, req.query);
    const searchDate = new Date(obj.transitDat);
    const startOfDay = new Date(
      Date.UTC(
        searchDate.getUTCFullYear(),
        searchDate.getUTCMonth(),
        searchDate.getUTCDate(),
        0,
        0,
        0,
        0,
      ),
    );
    const endOfDay = new Date(
      Date.UTC(
        searchDate.getUTCFullYear(),
        searchDate.getUTCMonth(),
        searchDate.getUTCDate() + 1,
        0,
        0,
        0,
        0,
      ),
    );
    const { to, from, transitDat, vehicleNo } = obj;
    const passenger = await bookingModel.find({
      to,
      from,
      vehicleNo,
      transitDat: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    console.log(passenger);
    res.status(200).json({
      success: true,
      passenger,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
}
