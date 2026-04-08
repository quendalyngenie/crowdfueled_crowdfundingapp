import { Component, OnInit } from '@angular/core';
import * as Sentiment from 'sentiment';
import { ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ai-model',
  templateUrl: './ai-model.page.html',
  styleUrls: ['./ai-model.page.scss'],
})

export class AiModelPage implements OnInit {
  @ViewChild('inputText', { static: false }) inputText: any;
  @Output() sentimentEmitter = new EventEmitter();
  sentimentResult: any;
  scores: [];

  constructor() { }

  ngOnInit() {
  }
  analyzeSentiment() {
    let sentiment = new Sentiment();
    let result = sentiment.analyze(this.inputText.value);
    this.sentimentEmitter.emit(result);
    // if (result.score == -3){
    //   let negScore = result.score + 2;
    //   console.log(negScore);
    // }
    // else if (result.score == 3) {
    //   let posScore = result.score - 2;
    //   console.log(posScore);
    // }
    console.log(result.score);
    // console.log(result.comparative);
    // console.log(result.calculation);
  }


}
