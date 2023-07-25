import { createSelector } from '@ngrx/store';
import { Task } from '../model/task.model';

export interface ItemsFeatureState {
  items: Task[];
  currentItem: Task | undefined;
}

export const selectItemsState = (state: any) => state.itemsFeature;

export const selectItems = createSelector(
  selectItemsState,
  (state: ItemsFeatureState) => {
    return state?.items;
  }
);

export const selectCurrentItem = createSelector(
  selectItemsState,
  (state: ItemsFeatureState) => {
    return state?.currentItem;
  }
);
