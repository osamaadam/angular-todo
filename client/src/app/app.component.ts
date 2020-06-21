import { Component, OnInit } from "@angular/core";
import { User } from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const theme = localStorage.getItem("theme");
    const user = JSON.parse(localStorage.getItem("user"));
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (user) {
      this.user = user;
    }
  }

  user: User;
  changeUser(elementRef: any) {
    elementRef?.loginEvent?.subscribe((user) => {
      this.user = user;
    });
  }
}
