import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../models';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: []
})
export class FormFieldComponent {
  @Input() public question!: Question;
  @Input() public answer: any;
  @Output() public answerChange = new EventEmitter<any>();
  @Output() public multiChoiceUpdate = new EventEmitter<{ questionId: number; option: string; checked: boolean }>();

  public onMultiChoiceChange(option: string, event: any): void {
    this.multiChoiceUpdate.emit({ questionId: this.question.id, option, checked: event.target.checked });
  }
}