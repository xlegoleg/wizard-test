import { animate, state, style, transition, trigger } from "@angular/animations";

export const stepAnimation = trigger('stepAnimation', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in')
  ]),
]);