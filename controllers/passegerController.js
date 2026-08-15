import bookingModel from "../models/bookingModel.js";

export async function getPassengers(req, res) {
  try {
    const obj = Object.assign({}, req.query);
    console.log(obj);
    console.log(typeof obj.transitDat);
    const { to, from, transitDat, vehicleNo } = obj;
    const passenger = await bookingModel.find({
      to,
      from,
      transitDat,
      vehicleNo,
    });
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
