import { makeAutoObservable } from "mobx";

export class ShowForm {
  isShowForm: boolean;

  constructor() {
    this.isShowForm = true;
    makeAutoObservable(this);
  }

  showForm() {
    this.isShowForm = true;
  }

  hideForm() {
    this.isShowForm = false;
  }
}

export const showFormStore = new ShowForm();
