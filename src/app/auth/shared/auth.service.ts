import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(user: any): Observable<any> {
    return this.http.post("/api/v1/users/register", user);
  }

  public login(user: any): Observable<any> {
    return this.http.post("/api/v1/users/auth", user).pipe(
      map((token: string) => {
        return this.saveToken(token);
      })
    );
  }

  private saveToken(token: string): string {
    localStorage.setItem("bwm_auth", token);
    return token;
  }
}
