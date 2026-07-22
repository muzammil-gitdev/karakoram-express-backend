import transitModel from "../models/trasitModel.js";

export async function createTransitService(data) {
  return await transitModel.create(data);
}

export async function getAllTransitService() {
  return await transitModel.find();
}

export async function getTransitService(origin, destination, start, end) {
  return await transitModel.find({
    from: origin,
    to: destination,
    departure: {
      $gte: start,
      $lte: end,
    },
  });
}

export async function updateTransitService(key, data) {
  return await transitModel.replaceOne({ _id: key }, data);
}

export async function deleteTransitService(id) {
  return await transitModel.deleteOne({ _id: id });
}
