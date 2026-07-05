import featuredRoutesModel from "../models/featuredRoutesModel.js";

export async function addFeatureRouteService(data) {
  return await featuredRoutesModel.create(data);
}
export async function getAllfeaturedRoutesService() {
  return await featuredRoutesModel.find();
}
