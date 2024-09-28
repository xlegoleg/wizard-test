import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Step } from '../entity/Step';

export const getSteps = async (req: Request, res: Response) => {
  const stepRepository = getRepository(Step);
  const steps = await stepRepository.find();
  res.json(steps);
};