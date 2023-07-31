import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../model/task.model';

// type - это строка только для чтения описывающяя что означает действие
// payload (полезная нагрузка) тип это свойства зависит от того, какие данные нужно отправить редуктору
export const TaskPageActions = createActionGroup({
  source: 'Tasks/Page',
  events: {
    'Get Items': emptyProps(),
    '[Items API] Items loaded': props<{ data: Task[] }>(),
    'Create Item': props<{ item: Task }>(),
    'Delete Item': props<{ item: Task }>(),
    'Get Item': props<{ id: number }>(),
    'Update Item': props<{ item: Task }>(),
  },
});
