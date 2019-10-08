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
        background:'red',
        border:'red',
        color:'red'
      })),
      transition('normal => attacked', animate('500ms')),
      transition('attacked => normal', animate('500ms'))
    ]),
    trigger('missed', [
      state('normal', style({
      })),
      state('missed', style({
        background:'yellow',
        border:'yellow',
        color:'yellow'
      })),
      transition('normal => missed', animate('500ms')),
      transition('missed => normal', animate('500ms'))
    ]),
    
    trigger('missedText', [
      state('normal', style({
      })),
      state('missedText', style({
        color:"blue"
      })),
      transition('normal => missedText', animate('500ms')),
      transition('missedText => normal', animate('500ms'))
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() properties = null;
  state: string = 'normal';
  constructor() {
  }

  attackedAnimation(cb){
    this.stateChange('missedText')

    this.stateChange('attacked').then(() =>{
      cb()
    })
  }
  
  missAnimation(){
    this.stateChange('missedText')
    this.stateChange('missed')
  }

  async stateChange(state:string){
    this.state = state;
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
