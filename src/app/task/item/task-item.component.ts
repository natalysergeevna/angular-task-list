import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../modal/task-modal.component';
import { Task } from '../model/task.model';
import { TaskPageActions } from '../store/task.actions';
import { Store } from '@ngrx/store';
import { ItemsFeatureState } from '../store/task.selectors';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Input() isView = false;
  @Output() deleted = new EventEmitter<Task>();

  isOverdue = false;
  isWarning = false;

  constructor(
    public dialog: MatDialog,
    private readonly store: Store<ItemsFeatureState>
  ) {}

  ngOnInit(): void {
    const curTimestamp = Math.round(new Date().getTime() / 1000);
    this.isOverdue = this.task.deadline < curTimestamp;
    if (!this.isOverdue) {
      this.isWarning = this.task.deadline - curTimestamp <= 3 * 24 * 3600;
    }
  }

  /**Изменить задачу */
  changeTask() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { task: { ...this.task }, isCreated: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          TaskPageActions.updateItem({ item: { ...result, id: this.task.id } })
        );
      }
    });
  }
  /**Удалить задачу их списка задач */
  deleteTask() {
    this.deleted.emit(this.task);
  }
}
