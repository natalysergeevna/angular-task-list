import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Task, TaskForm } from '../model/task.model';
import * as _momet from 'moment';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { NgIf } from '@angular/common';
import { MyErrorStateMatcher } from './errorStateMathcer';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

type DialogData = {
  task: Task;
  isCreated: boolean;
};

@Component({
  selector: 'modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-model.component.scss'],
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class TaskModalComponent implements OnInit {
  public ownerForm: FormGroup<TaskForm>;
  matcher = new MyErrorStateMatcher();

  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.ownerForm = this.formBuilder.group({
      name: new FormControl(this.data.task.name, [Validators.required]),
      deadline: new FormControl(
        this.data.task.deadline
          ? _momet(this.data.task.deadline * 1000)
          : _momet(),
        [Validators.required]
      ),
      descr: new FormControl(this.data.task.descr),
    });
  }
  /**
   * Подтверждение сохранения задачи/создание новой
   */
  onSave(): void {
    this.submitted = true;
    if (this.ownerForm.valid) {
      const formatedDate = this.ownerForm.value.deadline
        ? this.ownerForm.value.deadline.unix()
        : _momet().unix();
      this.dialogRef.close({ ...this.ownerForm.value, deadline: formatedDate });
    }
  }
  /**
   * Отмена изменения/создания новой задачи
   */
  onCancel(): void {
    this.dialogRef.close();
  }
  /**
   * Ошибка в поле ввода
   * @param {FormControl} control поле формы, для которого необходимо проверить наличие ошибки
   * @returns
   */
  getError(control: FormControl) {
    return (control.touched || this.submitted) && control.errors?.['required'];
  }
  /**
   * Обратка события нажатия кнопок клавиатуры для поля даты
   * @param {KeyboardEvent} event событие клавиатуры
   */
  keyDownDedline(event: KeyboardEvent) {
    event.preventDefault();
  }
}
