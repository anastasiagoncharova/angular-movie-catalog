import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public color = new Subject<any>();

  /**
    * Get color
    * @returns observable
    * */
   public getColor(): Observable<any> {
    return this.color.asObservable();
  }

  /**
   * Set color
   * @param data master color
   * @returns string
   * */
  public setColor(data) {
    this.color.next(data);
  }
}
