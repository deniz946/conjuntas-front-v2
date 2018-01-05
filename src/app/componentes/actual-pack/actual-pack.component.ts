import { Component, OnInit, Input } from '@angular/core';
import { Pack } from '../../core/models/Pack';

@Component({
  selector: 'app-actual-pack',
  templateUrl: './actual-pack.component.html',
  styleUrls: ['./actual-pack.component.css']
})
export class ActualPackComponent implements OnInit {
  @Input() public pack: Pack;

  constructor() { }

  ngOnInit() {
    this.sortComments();
  }

  sortComments() {
    this.pack.comments.reverse();
  }

}
