import express from "express";
import { Request, Response } from "express";
import runnerService from "../services/runnerService";
import utils from "../utils/utils";
const runnerRouter = express.Router();

runnerRouter.get("/", (_request: Request, response: Response) => {
  runnerService.getRunners().then((runners) => {
    response.json(runners);
  });
});

runnerRouter.post("/", async (request: Request, response: Response) => {
  try {
    const runnerBody = utils.toNewRunner(request.body);
    const runner = await runnerService.createRunner(runnerBody);
    response.status(201).json(runner);
  } catch (error: any) {
    console.log(error.message);
    response.status(400).json({ error: error.message });
  }
});

runnerRouter.get("/:id", (request: Request, response: Response) => {
  const runner = runnerService.getRunner(request.params.id);
  response.json(runner);
  return runner;
});

runnerRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    await runnerService.deleteRunner(request.params.id);
    response.status(204).json({ message: "runner deleted" });
  }
  catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

runnerRouter.put("/:id", async (request: Request, response: Response) => {
  try {
    const points = utils.toValidateNumber(request.body.points);
    console.log(points);
    const runner = await runnerService.updateRunner(request.params.id, points);
    response.json(runner);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});


export default runnerRouter;