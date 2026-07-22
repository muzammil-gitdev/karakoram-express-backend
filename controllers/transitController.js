import {
  createTransitService,
  deleteTransitService,
  getAllTransitService,
  getTransitService,
  updateTransitService,
} from "../services/transitService.js";

export async function createTransit(req, res) {
  try {
    const data = req.body;
    console.log(data);
    const response = await createTransitService(data);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getAllTransit(req, res) {
  try {
    const response = await getAllTransitService();
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateTransit(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const response = await updateTransitService(id, data);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export async function deleteTransit(req, res) {
  try {
    const id = req.params.id;
    const response = await deleteTransitService(id);
    res.status(200).json({
      success: true,
      response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export async function getTransit(req, res) {
  const obj = Object.assign({}, req.query);
  const { from, to, start, end } = obj;
  const data = await getTransitService(from, to, start, end);
  try {
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(201).json({
      success: false,
      error: err.message,
    });
  }
}
