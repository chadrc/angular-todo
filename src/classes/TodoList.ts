import Todo from "./Todo";
import genId from "@/genId";
export default class TodoList {
  id!: number;
  name!: String;
  todos!: Todo[];
  categoryId!: number;

  constructor(name: String, categoryId: number, todos: Todo[] = []) {
    this.id = genId();
    this.name = name;
    this.todos = todos;
    this.categoryId = categoryId;
  }
}
