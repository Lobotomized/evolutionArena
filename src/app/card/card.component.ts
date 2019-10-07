import { Component, OnInit, Input } from '@angular/core';
import { transition, state, trigger, style, animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  animations: [
    trigger('attacked', [
      state('normal', style({
      })),
      state('attacked', style({
        background:'red'
      })),
      transition('normal => attacked', animate('500ms')),
      transition('attacked => normal', animate('500ms'))
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() properties = null;
  state: string = 'normal';
  constructor() {
  }

  async attackedAnimation(){
    this.state = 'attacked';
    await this.delay(500)
    this.state = 'normal'

    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  ngOnInit() {
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
