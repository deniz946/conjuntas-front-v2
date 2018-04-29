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
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BooksComponent } from './books/books.component';
import { SearchComponent } from './search/search.component';
import {AutoCompleteModule} from 'primeng/autocomplete';



const routes: Routes = [
  {path: '', component: MainComponent},
  // {path: 'details/:id', component: PackDetailComponent},
  {path: 'books/:id', component: BooksComponent},
  {path: 'books/:id/:bookId', component: BooksComponent},

  { path: '**', component: MainComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ActualPackComponent,
    ValidateComponent,
    FaqComponent,
    InstructionsComponent,
    MainComponent,
    BooksComponent,
    SearchComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    CountdownTimerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [ActivePackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
