import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
// import { tasks } from '../store/task.actions';
import { TaskPageActions } from '../store/task.actions';

@Injectable()
// эффект слушает, проверяет, является ли действие одним из тех типов действий, которые у него есть
export class TaskEffect {
  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskPageActions.getItems),
      mergeMap(() =>
        this.taskService.getItems().pipe(
          map((items) => {
            // return tasks({ data: items.data });
            return TaskPageActions['[ItemsAPI]ItemsLoaded']({
              data: items.data,
            });
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
