import { Request, Response } from "express";
import TaskModel from "./task-model.js";

const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, complete } = req.body;
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).send();
    }

    await TaskModel.updateOne(
      { _id: id },
      { $set: { name, description, complete } }
    );
    res.status(204).send();
    return;
  } catch (e) {
    console.log(e);
    res.status(404).send();
    return;
  }
};

export default updateTask;
