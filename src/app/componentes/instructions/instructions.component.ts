import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Mycomponents } from '../../core/enums/mycomponents.enum';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  @Output() componentChanged: EventEmitter<number> = new EventEmitter;
  public ComponentsEnum = Mycomponents;
  constructor() { }

  ngOnInit() {
  }

  navigateTo(component: number){
    this.componentChanged.emit(component);
  } 

}
