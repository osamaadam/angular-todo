import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {}

  @Output() loginEvent: EventEmitter<User> = new EventEmitter();

  email: string = "";
  password: string = "";

  login(email: string, password: string) {
    if (email.trim() && password.trim())
      this.loginService.login(email, password).subscribe((result) => {
        if (result) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          this.loginEvent.emit(result.user);
          window.location.pathname = "/";
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      });
  }
}
