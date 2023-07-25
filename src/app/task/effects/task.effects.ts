import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import { tasks } from '../store/task.actions';
import { TaskPageActions } from '../store/task-page.actions';

@Injectable()
export class TaskEffect {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskPageActions.getItems),
      mergeMap(() =>
        this.taskService.getItems().pipe(
          map((items) => tasks({ data: items.data })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
