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
export class AppComponent implements OnInit {
  title = "Todo App";
  burgerOpen = false;
  newTodoText = "";
  selectedListIndex = 0;
  creatingList = false;
  listIndexToDelete = -1;
  editingListIndex = -1;
  selectedCategoryId = -1;
  editingCategories = false;
  currentCategoryPage = 1;
  categories: Category[] = [];
  todoLists: TodoList[] = [];
  fetchCategoriesError: any;
  fetchTodoListsError: any;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        this.fetchCategoriesError = error;
      }
    );

    this.todoService.getTodoLists().subscribe(
      todoLists => {
        this.todoLists = todoLists;
      },
      error => {
        this.fetchTodoListsError = error;
      }
    );
  }

  toggleBurger() {
    this.burgerOpen = !this.burgerOpen;
  }

  get categoriesWithLists() {
    let categoryIds = {};
    for (let list of this.todoLists) {
      categoryIds[list.categoryId] = true;
    }
    return Object.keys(categoryIds).map(categoryId =>
      this.categories.find(category => category.id === parseInt(categoryId))
    );
  }

  listsWithCategory(categoryId: number) {
    return this.todoLists.filter(
      (list: TodoList) => list.categoryId === categoryId
    );
  }

  get selectedListTodos() {
    if (this.selectedListIndex === -1) {
      return [];
    }

    let list = this.todoLists[this.selectedListIndex];

    return list ? list.todos : [];
  }

  selectList(listId: number) {
    this.selectedListIndex = this.todoLists.findIndex(
      (list: TodoList) => list.id === listId
    );
  }
}
