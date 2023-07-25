import { FormControl } from '@angular/forms';
import { Moment } from 'moment';

export interface Task {
  id: number;
  name: string;
  deadline: number;
  descr: string;
}

export interface TaskList {
  data: Task[];
}

export interface TaskForm {
  name: FormControl<string | null>;
  deadline: FormControl<Moment | null>;
  descr: FormControl<string | null>;
}
