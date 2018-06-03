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
  public dogCountUpdated: Observable<number>;
  private scoreSubject : Subject<number>;
  private dogCountSubject: Subject<number>;

  constructor(private http : HttpClient) {
      this.scoreSubject = new Subject<number>();
      this.dogCountSubject = new Subject<number>();
      this.scoreUpdated = this.scoreSubject.asObservable();
      this.dogCountUpdated = this.dogCountSubject.asObservable();
   }

  getDogs() : Observable<Dog[]> {
    return this.http.get<Dog[]>('/api/dogs');
  }

  getDog(id : number) : Observable<Dog> {
    return this.http.get<Dog>('/api/dogs/' + id);
  }

  addDog(dog : Dog) : Observable<Dog> {
    this.dogCountSubject.next();
    return this.http.post<Dog>('/api/dogs', { dog : dog }); 
  }

  updateDog(id: number, dog: Dog) : Observable<Dog> {
    return this.http.put<Dog>(`/api/dogs/${id}`, { dog: dog  });
  }

  removeDog(id) : Observable<Dog> {
    return this.http.delete<Dog>(`/api/dogs/${id}`)
  }

  addScore(increment) {
    this.score += increment;
    this.scoreSubject.next(this.score);
  }

  getScore() {
    return this.score;
  }

}
