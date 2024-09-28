import express from 'express';
import { createConnection } from 'typeorm';
import { getSteps } from './controller/stepController';
import { saveQuiz } from './controller/quizController';

const app = express();
app.use(express.json());

app.get('/api/steps', getSteps);
app.post('/api/quiz', saveQuiz);

createConnection().then(() => {
  app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
  });
});