import { Component, OnInit } from '@angular/core';
import { Dog } from '../dog';
import { DogsService } from '../dogs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.scss']
})
export class EditDogComponent implements OnInit {

  dog : Dog;

  constructor(private dogsService : DogsService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("get dog");
      this.dogsService.getDog(params.id).subscribe((dog) => {
        this.dog = dog;
      });
    });
  }

  updateDog() {
    this.dogsService.updateDog(this.dog.id, this.dog).subscribe((dog) => {
      this.dog = dog;
    });
    this.router.navigate(['/']);
  }

}
