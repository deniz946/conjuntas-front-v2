import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pack } from '../models/Pack';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/Book';

@Injectable()
export class ActivePackService {

public activePack: BehaviorSubject<string> = new BehaviorSubject('dsfgds');
constructor(private http: HttpClient) { }


getActivePacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${environment.API}public/active`);
}

getBooks(): Observable<Book[]> {
  return this.http.get<Book[]>(`${environment.API}public/books`);
}

}
