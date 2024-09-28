import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Quiz } from '../entity/Quiz';

export const saveQuiz = async (req: Request, res: Response) => {
  const quizRepository = getRepository(Quiz);
  const newQuiz = quizRepository.create(req.body);
  const result = await quizRepository.save(newQuiz);
  res.json(result);
};