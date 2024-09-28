import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { WizardService } from './services/wizard.service';
import {FormFieldComponent} from "./components/form-field/form-field.component";

const routes: Routes = [
  { path: '', component: WizardComponent },
];

@NgModule({
  declarations: [WizardComponent, FormFieldComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule.forChild(routes)],
  providers: [WizardService]
})
export class WizardModule {}
