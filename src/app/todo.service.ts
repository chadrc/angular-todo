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
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("api/categories.json").pipe(
      tap(this.log),
      catchError(this.handleError)
    );
  }

  getTodoLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>("api/todoLists.json").pipe(
      tap(this.log),
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
