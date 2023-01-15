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
    team: body.team
  });

  const savedRunner = await runner.save();

  response.status(201).json(savedRunner);
  return savedRunner;
});

export default runnerRouter;