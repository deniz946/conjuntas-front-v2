import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pack } from '../core/models/Pack';
import { Mycomponents } from '../core/enums/mycomponents.enum';
import { FormBuilder } from '@angular/forms';
import { ActivePackService } from '../core/services/active-pack.service';
import { CustomPack } from '../componentes/validate/validate.component';
import UIkit from 'uikit';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public selectedTab = 1;
  public packs: Pack[] = [];
  public actualPack: Pack;
  public activePack: string;
  public packEnded = false;
  public ComponentsEnum = Mycomponents;
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
        this.checkAvailability(pack.dateEnd);
        this.actualPack = pack;
      });
  }

  getActivePack() {
    this.activePackService.getActivePack()
      .subscribe((pack: any) => {
        this.activePackService.activePack.next(pack.pack);
        this.activePack = pack.pack;
        // this.checkAvailability(pack)
        this.getPacks();
        this.getActualPack();
      });
  }

  checkAvailability(date) {
    const now = moment();
    // for testing
    // const dateEnd = moment(date).subtract(9, 'days').subtract(2, 'hours');
    const dateEnd = moment(date);
    const dif = dateEnd.diff(now, 'hours');
    if (0 > dif) {
      this.packEnded = true;
    }
  }

}
