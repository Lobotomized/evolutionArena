import { Component, OnInit, Input } from '@angular/core';
import {delay} from '../helpers/delay';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  @Input() properties = null;
  state = 'normal';

  constructor() {
  }

  attackedAnimation(cb) {
    this.stateChange('damage').then(() => {
      cb();
    });
  }

  missAnimation(cb) {
    this.stateChange('miss').then(() => {
      cb();
    });
  }

  buffAnimation(cb) {
    this.stateChange('buff').then(() => {
      cb();
    });
  }

  healAnimation(cb) {
    this.stateChange('heal').then(() => {
      cb();
    });
  }

  curseAnimation(cb) {
    this.stateChange('curse').then(() => {
      cb();
    });
  }

  // tslint:disable-next-line: no-shadowed-variable
  async stateChange(state: string) {
    this.state = state;
    await delay(500);
    this.state = 'normal';

    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  ngOnInit() {
  }


}
