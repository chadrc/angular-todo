import { Component } from "@angular/core";
import TodoList from "../classes/TodoList";
import Todo from "../classes/Todo";
import Category from "../classes/Category";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Todo App";
  newTodoText = "";
  selectedListIndex = 0;
  creatingList = false;
  listIndexToDelete = -1;
  editingListIndex = -1;
  selectedCategoryId = -1;
  editingCategories = false;
  currentCategoryPage = 1;
  categories = [
    new Category("Category 1"),
    new Category("Category 2"),
    new Category("Category 3"),
    new Category("Category 4"),
    new Category("Category 5"),
    new Category("Category 6"),
    new Category("Category 7"),
    new Category("Category 8"),
    new Category("Category 9"),
    new Category("Category 10"),
    new Category("Category 11"),
    new Category("Category 12"),
    new Category("Category 13")
  ];
  todoLists = [
    new TodoList("List 1", 4, [new Todo("Todo 1.1"), new Todo("Todo 1.2")]),
    new TodoList("List 2", 5),
    new TodoList("List 3", 9, [
      new Todo("Todo 3.1"),
      new Todo("Todo 3.2"),
      new Todo("Todo 3.3"),
      new Todo("Todo 3.4"),
      new Todo("Todo 3.5")
    ]),
    new TodoList("List 4", 2, [
      new Todo("Todo 4.1"),
      new Todo("Todo 4.2"),
      new Todo("Todo 4.3")
    ])
  ];

  listsWithCategory(categoryId: number) {
    return this.todoLists.filter(
      (list: TodoList) => list.categoryId === categoryId
    );
  }

  get selectedListTodos() {
    if (this.selectedListIndex === -1) {
      return [];
    }

    return this.todoLists[this.selectedListIndex].todos;
  }
}
