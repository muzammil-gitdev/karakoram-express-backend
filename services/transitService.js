import transitModel from "../models/trasitModel.js";

export async function createTransitService(data) {
  return await transitModel.create(data);
}
