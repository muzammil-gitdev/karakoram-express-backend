import transitModel from "../models/trasitModel.js";

export async function createTransitService(data) {
  return await transitModel.create(data);
}

export async function getAllTransitService() {
  return await transitModel.find();
}

export async function updateTransitService(key, data) {
  return await transitModel.replaceOne({ _id: key }, data);
}
