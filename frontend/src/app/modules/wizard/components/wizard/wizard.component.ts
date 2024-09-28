import { Component, OnInit } from '@angular/core';
import { WizardService } from '../../services/wizard.service';
import { Step, QuizAnswer } from '../../models';
import { Router } from "@angular/router";
import { stepAnimation } from "../../animation/step.animation";

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: [],
  animations: [stepAnimation]
})
export class WizardComponent implements OnInit {
  public steps: Step[] = [];
  public currentStepIndex: number = 0;
  public answers: any[] = [];
  public errorMessage: string = '';

  public constructor(private wizardService: WizardService, private router: Router) {}

  public ngOnInit(): void {
    this.wizardService.getSteps().subscribe((data: Step[]) => {
      if (data) {
        this.steps = data;
        this.initializeAnswers();
      }
    });
  }

  public nextStep(): void {
    if (this.isStepComplete()) {
      this.errorMessage = '';
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
      }
    } else {
      this.errorMessage = 'Please complete all fields before proceeding to the next step.';
    }
  }

  public prevStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.errorMessage = '';
    }
  }

  public submit(): void {
    if (this.isStepComplete()) {
      this.errorMessage = '';
      const completedQuiz: QuizAnswer[] = [];

      this.answers.forEach((stepAnswer, stepIndex) => {
        stepAnswer.answers.forEach((answer, questionIndex) => {
          completedQuiz.push({
            questionId: this.steps[stepIndex].questions[questionIndex].id,
            answer: answer,
          });
        });
      });

      this.wizardService.submitQuiz({ answers: completedQuiz }).subscribe((response) => {
        alert('Quiz submitted successfully');
        this.resetWizard();
        this.router.navigate(['/']);
      });
    } else {
      this.errorMessage = 'Please complete all fields before submitting.';
    }
  }
  public updateMultiChoiceAnswer(questionId: number, option: string, isChecked: boolean): void {
    const questionIndex = this.steps[this.currentStepIndex].questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
      let selectedAnswers = this.answers[this.currentStepIndex].answers[questionIndex];
      if (!selectedAnswers) {
        selectedAnswers = [];
      }

      if (isChecked) {
        selectedAnswers.push(option);
      } else {
        const index = selectedAnswers.indexOf(option);
        if (index !== -1) {
          selectedAnswers.splice(index, 1);
        }
      }
      this.answers[this.currentStepIndex].answers[questionIndex] = selectedAnswers;
    }
  }

  public isStepComplete(): boolean {
    const currentStepAnswers = this.answers[this.currentStepIndex].answers;
    return currentStepAnswers.every(answer => answer !== null && answer !== '');
  }

  private resetWizard(): void {
    this.currentStepIndex = 0;
    this.answers = this.steps.map((step) => ({
      questionId: step.id,
      answers: step.questions.map(() => null),
    }));
  }

  private initializeAnswers(): void {
    this.answers = this.steps.map(step => ({
      stepId: step.id,
      answers: step.questions.map(() => null)
    }));
  }
}
