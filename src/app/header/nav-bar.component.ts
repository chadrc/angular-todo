import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  title = "Todo App";
  burgerOpen = false;

  toggleBurger() {
    this.burgerOpen = !this.burgerOpen;
  }

  constructor() {}

  ngOnInit() {}
}
