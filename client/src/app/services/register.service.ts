import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserWithToken } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(email: string, password: string, username: string) {
    return this.httpClient.post<UserWithToken>("/api/user/register", {
      username,
      email,
      password,
    });
  }
}
