import { Injectable } from "@angular/core";
import Category from "src/classes/Category";
import TodoList from "src/classes/TodoList";
import Todo from "src/classes/Todo";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private categories: Category[] = [
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

  private todoLists: TodoList[] = [
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

  getCategories(): Promise<Category[]> {
    return Promise.resolve(this.categories);
  }

  getTodoLists(): Promise<TodoList[]> {
    return Promise.resolve(this.todoLists);
  }
}
