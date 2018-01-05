import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivePackService {

public activePack: BehaviorSubject<string> = new BehaviorSubject('dsfgds');
constructor(private http: HttpClient) { }


getActivePack() {
    return this.http.get(`${environment.API}pack/active`);
}

}
