import { Injectable } from "@angular/core";
import Category from "src/classes/Category";
import TodoList from "src/classes/TodoList";
import Todo from "src/classes/Todo";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private categories: Category[];
  private todoLists: TodoList[];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    if (this.categories) {
      return of(this.categories);
    }

    return this.http.get<Category[]>("api/categories.json").pipe(
      tap(this.log),
      tap(data => (this.categories = data)),
      catchError(this.handleError)
    );
  }

  getTodoLists(): Observable<TodoList[]> {
    if (this.todoLists) {
      return of(this.todoLists);
    }

    return this.http.get<TodoList[]>("api/todoLists.json").pipe(
      tap(this.log),
      tap(data => (this.todoLists = data)),
      catchError(this.handleError)
    );
  }

  private log(data: any) {
    console.log("Fetched: ", data);
  }

  private handleError(
    error: HttpErrorResponse,
    caught: Observable<any>
  ): never {
    console.log(error);
    throw Error();
  }
}
