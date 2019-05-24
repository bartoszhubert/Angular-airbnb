import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RentalService {
  constructor(private http: HttpClient) {}

  public getRentalById(id: string): Observable<any> {
    return this.http.get("/api/v1/rentals/" + id);
  }

  public getRentals(): Observable<any> {
    return this.http.get("/api/v1/rentals");
  }

  // public getRentalById(id: string): Observable<Rental> {
  //   return new Observable<Rental>(observer => {
  //     setTimeout(() => {
  //       const foundRental = this.rentals.find(rental => rental.id === id);
  //       observer.next(foundRental);
  //     }, 500);
  //   });
  // }

  // public getRentals(): Observable<Rental[]> {
  //   return new Observable<Rental[]>(observer => {
  //     setTimeout(() => {
  //       observer.next(this.rentals);
  //     }, 1000);
  //   });
  // }
}
