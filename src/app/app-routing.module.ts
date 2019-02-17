import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodoPageComponent } from "./todo/todo-page.component";
import { CategoriesPageComponent } from "./categories/categories-page.component";

const routes: Routes = [
  { path: "categories", component: CategoriesPageComponent },
  { path: "", component: TodoPageComponent },
  { path: "**", component: TodoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
