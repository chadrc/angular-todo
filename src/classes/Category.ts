import genId from "../utils/genId";

export default class Category {
  id!: number;
  name!: string;

  constructor(name: string) {
    this.id = genId();
    this.name = name;
  }
}
