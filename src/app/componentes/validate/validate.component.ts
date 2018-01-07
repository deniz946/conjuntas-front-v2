import { environment } from './../../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Pack } from '../../core/models/Pack';
import UIkit from 'uikit';
import { ActivePackService } from '../../core/services/active-pack.service';

export class CustomPack extends Pack {
  _id: string;
  checked: boolean;
}

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {
  @Input() actualPack: Pack;
  @Input() packs: CustomPack[];
  @Input() packEnded: boolean;
  public indMorePacks = false;
  public paid = false;
  public totalPrice = 1;
  public validationForm: FormGroup;
  public checkedPacks: CustomPack[] = [];
  public activePack: string;

  constructor(
    private formBuilder: FormBuilder,
    private activePackService: ActivePackService,
    private http: HttpClient) {
    this.validationForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'email': [null, Validators.email]
    });
  }

  ngOnInit() {
    this.activePackService.activePack.subscribe((id: string) => {
      this.activePack = id;
      this.normalizePacks();
    });
  }

  onValidate(user) {
    if (user) {
      if (this.validationForm.valid) {
        if (user.username && user.email) {
          const params: any = {};
          const selectedPacks = this.getSelectedPacks();
          params.username = user.username;
          params.email = user.email;

          if (this.totalPrice > 0 && this.indMorePacks) {
            params.extra = selectedPacks;
          }
          this.http.post(environment.API + 'users/register/' + this.activePack, params).subscribe((response: any) => {
            UIkit.notification({ message: response.msg });
            // Reload web
            this.validationForm.reset();
            this.checkedPacks = [];
            this.indMorePacks = false;
            const modal = document.getElementById('modal-close-default');
            UIkit.modal(modal).hide();
          });
        } else {
          UIkit.notification({ message: '<i class="fa fa-times"></i> Faltan campos por rellenar' });
        }
      } else {
        UIkit.notification({ message: '<i class="fa fa-times"></i> Hay algún campo inválido, revisalos por favor' });
      }

    }
  }

  getSelectedPacks() {
    return this.checkedPacks.map((pack: CustomPack) => pack._id);
  }

  changedPacks(index: number, check: boolean) {
    this.packs[index].checked = check;
    this.checkedPacks = this.packs.filter((pack: CustomPack) => pack.checked);
    const size = this.checkedPacks.length;
    this.totalPrice = size + 1;
  }

  normalizePacks() {
    this.packs = this.packs.map((pack: CustomPack) => {
      pack.checked = false;
      return pack;
    });
  }

  onPay() {
    if (!this.indMorePacks) {
      this.totalPrice = 1;
    }
    const url = `https://www.paypal.me/humbleconjuntas/${this.totalPrice}`;
    window.open(url, '_blank');
    this.paid = true;
  }

}
