import { Component, OnInit, OnDestroy } from '@angular/core';

import { DogsService } from '../dogs.service';
import { Dog } from '../dog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  selectedDog : Dog;
  dogs : Dog[];
  filterTerm : string;
  dateFormat = 'fullDate'
  

  constructor(private dogsService : DogsService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit() {
    this.setDogs();
    this.route.queryParams.subscribe(queryParams => {
      this.filterTerm = queryParams.name;
    });
    }

  setDogs() {
    this.dogsService.getDogs().subscribe((dogs) => { 
      this.dogs = dogs;
    });
  }

  onFilterChanged(filterString) {
    this.router.navigate(['.'], { queryParams: { name: filterString }});
  }

  removeDog(id) {
    this.dogsService.removeDog(id).subscribe(() => {
      this.setDogs();
    });
  }

  toggleDate() {
    this.dateFormat == 'fullDate' ? this.dateFormat = 'shortDate' : this.dateFormat = 'fullDate';
  }

  selectDog(dog) {
    this.selectedDog = dog;
  }

  handleAddWalk(walk) {
    this.selectedDog.walks.push(walk);
    this.dogsService.updateDog(this.selectedDog.id, this.selectedDog);
    this.dogsService.addScore(10);
  }


}
