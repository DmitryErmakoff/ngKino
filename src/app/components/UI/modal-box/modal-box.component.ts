import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.scss']
})
export class ModalBoxComponent{
  constructor(
    public dialogRef: MatDialogRef<ModalBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false;
  }

  myForm: FormGroup = new FormGroup ({
    title: new FormControl(this.data?.title ?? null,),
    image: new FormControl(this.data?.image ?? null),
    date: new FormControl(this.data?.date ?? null),
  })

  isNew: boolean = true;

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.data = {
      title: this.myForm.value.title,
      image: this.myForm.value.image,
      date: this.myForm.value.date,
    }

    if (!this.validationFields(this.data.image, this.data.title, this.data.date)) {
      return;
    }

    console.log(this.myForm);
    this.dialogRef.close(this.data);
  }
  isImgLink(url: string) {
    return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
  }

  validationFields(image: string, title: string, date: string) {
    if (!image || !title || !date) {
      if (!date) {
        alert("Возможно вы ввели неправильный месяц");
        return false;
      }
      alert('Заполните все поля!');
      return false;
    }
    if (!title.trim()) {
      alert("Введите корректное название");
      return false;
    }
    if (date < "1900-01-01" || date > "2024-01-01" || (date).length != 10) {
      alert("Введите корректную дату релиза")
      return false;
    }
    if (!this.isImgLink(image)) {
      alert("Введите корректную ссылку на изображение");
      return false;
    }
    else { return true; }
  }

}
