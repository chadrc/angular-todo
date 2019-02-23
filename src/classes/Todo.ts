import genId from "../utils/genId";
export default class Todo {
  id!: number;
  text!: string;
  completed!: boolean;

  constructor(text: string) {
    this.id = genId();
    this.text = text;
    this.completed = false;
  }
}
