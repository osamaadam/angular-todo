import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    const theme = localStorage.getItem("theme");
    this.theme = theme === "light";
    this.isLoginPage = window.location.pathname === "/login";
  }

  @Input() user: User;

  theme: boolean;
  isLoginPage: boolean;

  changeTheme() {
    const theme = this.theme ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.pathname = "/login";
  }
}
