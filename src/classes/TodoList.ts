import Todo from "./Todo";
import genId from "../utils/genId";
export default class TodoList {
  id!: number;
  name!: string;
  todos!: Todo[];
  categoryId!: number;

  constructor(name: string, categoryId: number, todos: Todo[] = []) {
    this.id = genId();
    this.name = name;
    this.todos = todos;
    this.categoryId = categoryId;
  }
}
