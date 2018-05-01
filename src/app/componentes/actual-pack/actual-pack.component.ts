import { environment } from './../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { Pack } from '../../core/models/Pack';

@Component({
  selector: 'app-actual-pack',
  templateUrl: './actual-pack.component.html',
  styleUrls: ['./actual-pack.component.scss']
})
export class ActualPackComponent implements OnInit {
  @Input() public pack: Pack;
  public API = environment.API;

  constructor() { }

  ngOnInit() {
    this.sortComments();
  }

  sortComments() {
    this.pack.comments.reverse();
  }

}
