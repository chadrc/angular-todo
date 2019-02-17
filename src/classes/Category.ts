import genId from "@/genId";

export default class Category {
  id!: number;
  name!: string;

  constructor(name: string) {
    this.id = genId();
    this.name = name;
  }
}
