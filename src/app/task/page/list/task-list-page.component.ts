import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from 'src/app/task/modal/task-modal.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task } from '../../model/task.model';
import { ItemsFeatureState, selectItems } from '../../store/task.selectors';
import { TaskPageActions } from '../../store/task.actions';

@Component({
  selector: 'app-home',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss'],
})
export class TaskPageComponent {
  task: Task;
  tasks: Task[];

  constructor(
    private readonly store: Store<ItemsFeatureState>,
    public dialog: MatDialog
  ) {
    this.store.dispatch(TaskPageActions.getItems());
    this.store.select(selectItems).subscribe((data) => {
      this.tasks = data;
    });
  }
  /**
   * Добавление новой задачи
   */
  addTask(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {
        task: this.task || { name: '', deadline: null, descr: '' },
        isCreated: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(TaskPageActions.createItem({ item: result }));
      }
    });
  }
  /**
   * Удаление задачи
   * @param {Task} task Задача, которую удаляем
   */
  deleteTask(task: Task) {
    this.store.dispatch(TaskPageActions.deleteItem({ item: task }));
  }
  /**
   * Перемещение задачи по списку
   * @param {CdkDragDrop<Task[]>} event Событие, когда пользователь помещает перетаскиваемый элемент внутрь контейнера для перетаскивания
   */
  drop(event: CdkDragDrop<Task[]>) {
    const tasksForDrop = [...this.tasks];
    moveItemInArray(tasksForDrop, event.previousIndex, event.currentIndex);
    this.store.dispatch(TaskPageActions.changeOrder({ items: tasksForDrop }));
  }
}
