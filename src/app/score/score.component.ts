import { Component, OnInit } from '@angular/core';
import { DogsService } from '../dogs.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  score : number = null ;
  
  constructor(private dogsService : DogsService) { }

  ngOnInit() {
   this.score =this.dogsService.getScore();
   this.dogsService.scoreUpdated.subscribe((data)=>{
     debugger
     this.score=data;
   })
  }

  

}
