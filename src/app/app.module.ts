import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CategoriesPageComponent } from "./categories/categories-page.component";
import { NavBarComponent } from "./header/nav-bar.component";
import { TodoPageComponent } from "./todo/todo-page.component";
import {
  NbThemeModule,
  NbLayoutModule,
  NbActionsModule,
  NbMenuModule
} from "@nebular/theme";

@NgModule({
  declarations: [
    AppComponent,
    CategoriesPageComponent,
    NavBarComponent,
    TodoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbActionsModule,
    NbMenuModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
