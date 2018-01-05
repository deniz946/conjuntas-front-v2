import { Pack } from './core/models/Pack';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import UIkit from 'uikit';
import { ActivePackService } from './core/services/active-pack.service';
import { CustomPack } from './componentes/validate/validate.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public selectedTab = 1;
  public packs: Pack[] = [];
  public actualPack: Pack;
  public activePack: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private activePackService: ActivePackService
  ) { }

  ngOnInit() {
    this.getActivePack();
  }

  selectTab(tab: number) {
    this.selectedTab = tab;
  }

  getPacks() {
    this.http.get(environment.API + 'pack/?public=true').
      subscribe((res: Pack[]) => {
        console.log(res);
        this.packs = res.filter((item: CustomPack) => item._id !== this.activePack);
      });
  }

  goTo(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  getActualPack() {
    this.http.get(environment.API + 'pack/' + this.activePack)
      .subscribe((pack: Pack) => {
        this.actualPack = pack;
      });
  }

  getActivePack() {
    this.activePackService.getActivePack()
      .subscribe((pack: any) => {
        this.activePackService.activePack.next(pack.pack);
        this.activePack = pack.pack;
        this.getPacks();
        this.getActualPack();
      });
  }
}
