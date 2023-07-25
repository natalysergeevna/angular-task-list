import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../model/task.model';

export const TaskPageActions = createActionGroup({
  source: 'Tasks/Page',
  events: {
    'Get Items': emptyProps(),
    'Create Item': props<{ item: Task }>(),
    'Delete Item': props<{ item: Task }>(),
    'Get Item': props<{ id: number }>(),
    'Update Item': props<{ item: Task }>(),
  },
});
