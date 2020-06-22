import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RegisterService } from "../../services/register.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private registerService: RegisterService) {}
  ngOnInit(): void {}

  @Output() loginEvent: EventEmitter<User> = new EventEmitter();

  email: string;
  password: string;
  username: string;

  register(email: string, password: string, username: string) {
    this.registerService
      .register(email, password, username)
      .subscribe((result) => {
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
