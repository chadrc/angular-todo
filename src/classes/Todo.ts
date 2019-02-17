import genId from "../genId";
export default class Todo {
  id!: number;
  text!: String;
  completed!: Boolean;

  constructor(text: String) {
    this.id = genId();
    this.text = text;
    this.completed = false;
  }
}
