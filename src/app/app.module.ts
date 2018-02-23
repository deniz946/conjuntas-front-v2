import { ValidateComponent } from './componentes/validate/validate.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ActualPackComponent } from './componentes/actual-pack/actual-pack.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { FaqComponent } from './componentes/faq/faq.component';
import { ActivePackService } from './core/services/active-pack.service';
import { InstructionsComponent } from './componentes/instructions/instructions.component';


@NgModule({
  declarations: [
    AppComponent,
    ActualPackComponent,
    ValidateComponent,
    FaqComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CountdownTimerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [ActivePackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
