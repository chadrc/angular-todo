import { Component, OnInit } from "@angular/core";
import Category from "src/classes/Category";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-categories-page",
  templateUrl: "./categories-page.component.html",
  styleUrls: ["./categories-page.component.scss"]
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  removeCategory(id: number) {
    const index = this.categories.findIndex(
      (category: Category) => category.id === id
    );

    this.categories.splice(index, 1);
  }
}
