import { Injectable } from '@angular/core';
import { Dog } from './dog';
import Walk from './walk';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DogsService {

  score : number = 0;
  public scoreUpdated : Observable<number>;
  public dogsUpdated: Observable<Dog[]>;
  public dogsSubject: Subject<Dog[]>;
  private scoreSubject : Subject<number>;
 // dogs:Dog[];
dogs:Array<Dog>= new Array<Dog>();

  constructor(private http : HttpClient) {
      this.scoreSubject = new Subject<number>();
      this.dogsSubject = new Subject<Dog[]>();
      this.scoreUpdated = this.scoreSubject.asObservable();
      this.dogsUpdated = this.dogsSubject.asObservable();
      this.getDogs();
   }


  getDogs() :void {
    const observable =  this.http.get<Dog[]>('/api/dogs');
      observable.subscribe((data)=>{
        this.dogs = data;
        this.dogsSubject.next(data);
      })
  }

  getDog(id: number) {
    const objservable = this.http.get<Dog>('/api/edit-dog/' + id);
    return objservable;
  }


  addDog(newDog: Dog) {
     this.http.post<Dog>('/api/dogs', { dog: newDog }).subscribe((dog)=>{
       this.dogs.push(dog);
       this.dogsSubject.next(this.dogs
      
      );
       
     });
  }

  updateDog(id: number, dog: Dog) {
    this.http.put<Array<Dog>>(`/api/dogs/${id}`, { dog: dog }).subscribe((dogs)=>{
    //var existingDogIndex = this.dogsUpdated.subscribe((dogs)=>{ 
      this.dogsSubject.next(dogs);

    });
    //DOGS[existingDogIndex] = dog;
  }


  // removeDog(id) {
  //   var existingDogIndex = this.getDogs().findIndex((dog) => dog.id == id);
  //   DOGS.splice(existingDogIndex, 1);
  // }
  removeDog(id) {
    const objservable = this.http.delete<Dog[]>('/api/dogs/' + id);
    objservable.subscribe((dogs)=>{
        this.dogs = dogs;
        this.dogsSubject.next(this.dogs);

    });
  }


  addWalk(dog : Dog, walk : Walk) {
    dog.walks.push(walk);
  }

  addScore(increment) {
    this.score += increment;
    this.scoreSubject.next(this.score);
  }

  getScore() {
    return this.score;
  }

}
