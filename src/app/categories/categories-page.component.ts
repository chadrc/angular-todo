import { Component, OnInit, TemplateRef } from "@angular/core";
import Category from "src/classes/Category";
import { TodoService } from "../todo.service";
import { NbDialogService, NbDialogRef } from "@nebular/theme";

@Component({
  selector: "app-categories-page",
  templateUrl: "./categories-page.component.html",
  styleUrls: ["./categories-page.component.scss"]
})
export class CategoriesPageComponent implements OnInit {
  private _newCategoryName = "";
  private createCategoryDialogRef: NbDialogRef<any>;

  constructor(
    private todoService: TodoService,
    private dialogService: NbDialogService
  ) {}

  get newCategoryName() {
    return this._newCategoryName;
  }

  set newCategoryName(value: string) {
    this._newCategoryName = value;
  }

  get canCreateCategory() {
    return this._newCategoryName.trim() !== "";
  }

  ngOnInit() {
    this.todoService.getCategories().subscribe((categories: Category[]) => {
      // this.categories = categories;
    });
  }

  get categories(): Category[] {
    return this.todoService.categories;
  }

  removeCategory(id: number) {
    const index = this.categories.findIndex(
      (category: Category) => category.id === id
    );

    this.categories.splice(index, 1);
  }

  createCategory() {
    if (this._newCategoryName.trim() !== "") {
      this.categories.push(new Category(this._newCategoryName));
      this._newCategoryName = "";
    }
  }

  openCreateCategoryModal(ref: TemplateRef<any>) {
    this.createCategoryDialogRef = this.dialogService.open(ref);
    this.createCategoryDialogRef.onClose.subscribe(() => this.createCategory());
  }

  closeCreateCategoryModal() {
    this.createCategoryDialogRef.close();
    this.createCategoryDialogRef = null;
  }
}
