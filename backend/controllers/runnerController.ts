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

export default runnerRouter;