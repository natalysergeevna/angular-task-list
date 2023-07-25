import { createAction, props } from '@ngrx/store';
import { Task } from '../model/task.model';

export const tasks = createAction(
  '[Items API] Items loaded',
  props<{ data: Task[] }>()
);
