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
  public auxActualPack: Pack;
  public activePack: string;
  public packEnded = false;
  public activePacks: Pack[] = [];
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
    this.http.get(environment.API + 'public/packs').
      subscribe((res: Pack[]) => {
        this.packs = res.filter(
          (item: CustomPack) => !this.activePacks.find(
            item2 => item2._id === item._id));
      });
  }

  goTo(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  openActualPacksModal() {
    const element = document.getElementById('modal-packs');
    UIkit.modal(element).show();
  }

  getActualPack() {
    this.http.get(environment.API + 'public/packs/' + this.activePack)
      .subscribe((pack: Pack) => {
        this.checkAvailability(pack.dateEnd);
        this.actualPack = pack;
        const element = document.getElementById('modal-packs');
        UIkit.modal(element).hide();
      });
  }

  onModalActiveSelect(pack: Pack) {
    this.activePack = pack['_id'];
    this.checkAvailability(pack.dateEnd);
    this.activePackService.activePack.next(this.activePack);
    this.getPacks();
    this.getActualPack();
  }

  getActivePack() {
    this.activePackService.getActivePacks()
      .subscribe((packs: Pack[]) => {
        this.activePacks = packs['packs'];
        if (this.activePacks.length > 1) {
          this.openActualPacksModal();
        } else {
          this.onModalActiveSelect(this.activePacks[0]);
        }
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
