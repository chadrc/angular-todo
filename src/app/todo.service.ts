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
  private _categories: Category[] = [];
  private _todoLists: TodoList[] = [];

  constructor(private http: HttpClient) {}

  get categories(): Category[] {
    return this._categories;
  }

  get todoLists(): TodoList[] {
    return this._todoLists;
  }

  getCategories(): Observable<Category[]> {
    if (this._categories.length !== 0) {
      return of(this._categories);
    }

    return this.http.get<Category[]>("api/categories.json").pipe(
      tap(this.log),
      tap(data => (this._categories = data)),
      catchError(this.handleError)
    );
  }

  getTodoLists(): Observable<TodoList[]> {
    if (this._todoLists.length !== 0) {
      return of(this._todoLists);
    }

    return this.http.get<TodoList[]>("api/todoLists.json").pipe(
      tap(this.log),
      tap(data => (this._todoLists = data)),
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
