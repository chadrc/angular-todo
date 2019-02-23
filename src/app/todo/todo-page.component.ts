import { Component, OnInit, OnDestroy, TemplateRef } from "@angular/core";
import Category from "src/classes/Category";
import TodoList from "src/classes/TodoList";
import { TodoService } from "../todo.service";
import {
  NbMenuItem,
  NbMenuService,
  NbDialogService,
  NbDialogRef
} from "@nebular/theme";
import Todo from "src/classes/Todo";
import { takeWhile, tap } from "rxjs/operators";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";

interface CategoryListing {
  category: Category;
  lists: TodoList[];
}
@Component({
  selector: "app-todo-page",
  templateUrl: "./todo-page.component.html",
  styleUrls: ["./todo-page.component.scss"]
})
export class TodoPageComponent implements OnInit, OnDestroy {
  private _newTodoText = "";
  private alive = true;
  private _newListName = "";
  private createListDialogRef: NbDialogRef<any>;

  selectedListIndex = -1;
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
  selectedItem: string;

  constructor(
    private todoService: TodoService,
    private menuService: NbMenuService,
    private activedRoute: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  get newTodoText() {
    return this._newTodoText;
  }

  set newTodoText(value: string) {
    this._newTodoText = value;
  }

  get newListName() {
    return this._newListName;
  }

  set newListName(value: string) {
    this._newListName = value;
  }

  get selectedListName(): string {
    if (this.selectedListIndex === -1) {
      return "Select List";
    }

    return this.todoLists[this.selectedListIndex].name;
  }

  get selectedList(): TodoList {
    return this.todoLists[this.selectedListIndex];
  }

  get selectedListTodos(): Todo[] {
    if (this.selectedListIndex === -1) {
      return [];
    }

    const list = this.todoLists[this.selectedListIndex];

    return list ? list.todos : [];
  }

  ngOnInit() {
    this.todoService.getCategories().subscribe(
      categories => {
        this.categories = categories;

        this.todoService.getTodoLists().subscribe(
          todoLists => {
            this.todoLists = todoLists;
            this.createItems();
            this.activedRoute.paramMap.subscribe((params: ParamMap) => {
              const id = params.get("id");
              if (id) {
                this.selectList(parseInt(id, 10));
              }
            });
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

  ngOnDestroy() {
    this.alive = false;
  }

  closeCreateListDialog() {
    this.createListDialogRef.close();
    this.createListDialogRef = null;
  }

  createList() {
    const newList = new TodoList(this.newListName, 1);
    this.newListName = "";
    this.todoLists.push(newList);

    this.createItems();
  }

  openCreateListDialog(ref: TemplateRef<any>) {
    this.createListDialogRef = this.dialogService.open(ref);
    this.createListDialogRef.onClose.subscribe(() => this.createList());
  }

  addTodo() {
    if (this.selectedList) {
      const newTodo = new Todo(this.newTodoText);
      this.selectedList.todos.push(newTodo);
      this.newTodoText = "";
    }
  }

  selectList(listId: number) {
    this.selectedListIndex = this.todoLists.findIndex(
      (list: TodoList) => list.id === listId
    );
  }

  getSelectedItem() {
    this.menuService
      .getSelectedItem("todoListsMenu")
      .pipe(takeWhile(() => this.alive))
      .subscribe(menuBag => {
        console.log(menuBag);
        // this.selectedItem = menuBag.item.title;
      });
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
          title: list.name,
          link: `/list/${list.id}`
        }))
      }));
  }
}
