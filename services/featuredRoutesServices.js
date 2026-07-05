import featuredRoutesModel from "../models/featuredRoutesModel.js";

export async function addFeatureRouteService(data) {
  await featuredRoutesModel.create(data);
}
