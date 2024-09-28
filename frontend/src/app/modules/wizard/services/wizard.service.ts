import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Step, QuizData } from '../models';
import  { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  public constructor(private http: HttpClient) {}

  public getSteps(): Observable<Step[] | null> {
    return this.http.get<Step[]>('/api/steps').pipe(catchError((e) => {
      console.error('An error occurred while fetching steps', e);
      return of(null);
    }));
  }

  public submitQuiz(quizData: QuizData): Observable<any> {
    return this.http.post('/api/quiz', quizData).pipe(catchError((e) => {
      console.error('An error occurred while posting quiz', e);
      return of(null);
    }))
  }
}
