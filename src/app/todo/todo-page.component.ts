import { Component, OnInit } from "@angular/core";
import Category from "src/classes/Category";
import TodoList from "src/classes/TodoList";
import { TodoService } from "../todo.service";
import { NbMenuItem } from "@nebular/theme";
import Todo from "src/classes/Todo";

interface CategoryListing {
  category: Category;
  lists: TodoList[];
}
@Component({
  selector: "app-todo-page",
  templateUrl: "./todo-page.component.html",
  styleUrls: ["./todo-page.component.scss"]
})
export class TodoPageComponent implements OnInit {
  _newTodoText = "";
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
  menuItems: NbMenuItem[] = [];

  constructor(private todoService: TodoService) {}

  get newTodoText() {
    return this._newTodoText;
  }

  set newTodoText(value: string) {
    this._newTodoText = value;
  }

  ngOnInit() {
    this.todoService.getCategories().subscribe(
      categories => {
        this.categories = categories;

        this.todoService.getTodoLists().subscribe(
          todoLists => {
            this.todoLists = todoLists;
            this.createItems();
          },
          error => {
            this.fetchTodoListsError = error;
          }
        );
      },
      error => {
        this.fetchCategoriesError = error;
      }
    );
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

  get selectedListTodos(): Todo[] {
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

  createItems() {
    this.menuItems = this.todoLists
      .reduce((previous: CategoryListing[], current: TodoList) => {
        let categoryListing = previous.find(
          listing => listing.category.id === current.categoryId
        );

        if (!categoryListing) {
          categoryListing = {
            category: this.categories.find(
              category => category.id === current.categoryId
            ),
            lists: []
          };

          previous.push(categoryListing);
        }

        categoryListing.lists.push(current);

        return previous;
      }, [])
      .map((categoryListing: CategoryListing) => ({
        title: categoryListing.category.name,
        children: categoryListing.lists.map(list => ({
          title: list.name
        }))
      }));
  }
}
