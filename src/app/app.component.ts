import { Component, OnInit } from "@angular/core";
import TodoList from "../classes/TodoList";
import Todo from "../classes/Todo";
import Category from "../classes/Category";
import { TodoService } from "./todo.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {}
