import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserWithToken } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<UserWithToken>("/api/user/login", {
      email,
      password,
    });
  }
}
