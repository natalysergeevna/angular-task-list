import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../../model/task.model';
import {
  ItemsFeatureState,
  selectCurrentItem,
} from '../../store/task.selectors';
import { TaskPageActions } from '../../store/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task-one-page.component.html',
})
export class TaskComponent {
  id: number;
  task$: Observable<Task | undefined>;

  constructor(
    private readonly store: Store<ItemsFeatureState>,
    private activateRoute: ActivatedRoute
  ) {
    this.id = parseInt(activateRoute.snapshot.params['id']);
    this.store.dispatch(TaskPageActions.getItem({ id: this.id }));
    this.task$ = this.store.select(selectCurrentItem);
  }
}
