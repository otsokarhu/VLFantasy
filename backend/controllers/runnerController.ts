import express from "express";
import { Request, Response } from "express";
import Runner from "../models/runnerModel";
const runnerRouter = express.Router();

runnerRouter.get("/", (_request: Request, response: Response) => {
  const runners = Runner.find({}).then((runners) => {
    response.json(runners);
  });
  return runners;
});

runnerRouter.post("/", async (request: Request, response: Response) => {
  const body = request.body;

  const runner = new Runner({
    name: body.name,
    team: body.team,
    points: 0,
  });

  const savedRunner = await runner.save();

  response.status(201).json(savedRunner);
  return savedRunner;
});

runnerRouter.get("/:id", (request: Request, response: Response) => {
  const runner = Runner.findById(request.params.id).then((runner) => {
    response.json(runner);
  });
  return runner;
});

runnerRouter.delete("/:id", async (request: Request, response: Response) => {
  await Runner.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

runnerRouter.put("/:id", async (request: Request, response: Response) => {
  const body = request.body;

  const runnerToUpdate = await Runner.findById(request.params.id);
  if (!runnerToUpdate) {
    return response.status(404).json({
      error: "runner not found",
    });
  }

  const runner = {
    name: runnerToUpdate.name,
    team: runnerToUpdate.team,
    points: runnerToUpdate.points + body.points,
  };

  const updatedRunner = await Runner
    .findByIdAndUpdate(request.params.id, runner, { new: true });
  response.json(updatedRunner);
  return updatedRunner;
});


export default runnerRouter;