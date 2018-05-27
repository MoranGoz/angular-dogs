import { Component, OnInit, OnDestroy } from '@angular/core';

import { DogsService } from '../dogs.service';
import { Dog } from '../dog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  selectedDog : Dog;
  dogs = new Array<Dog>();
  filterTerm : string;
  dateFormat = 'fullDate'
  

  constructor(private dogsService : DogsService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit() {
    this.dogs = this.dogsService.getDogs();
    this.route.queryParams.subscribe(queryParams => {
      this.filterTerm = queryParams.name;
    });
    }


  onFilterChanged(filterString) {
    this.router.navigate(['.'], { queryParams: { name: filterString }});
  }

  removeDog(id) {
    this.dogsService.removeDog(id);
  }

  toggleDate() {
    this.dateFormat == 'fullDate' ? this.dateFormat = 'shortDate' : this.dateFormat = 'fullDate';
  }

  selectDog(dog) {
    this.selectedDog = dog;
  }

  handleAddWalk(walk) {
    this.dogsService.addWalk(this.selectedDog, walk);
    this.dogsService.addScore(10);
  }


}
