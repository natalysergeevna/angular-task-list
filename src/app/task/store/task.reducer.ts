import { createReducer, on } from '@ngrx/store';
import { ItemsFeatureState } from './task.selectors';
import { TaskPageActions } from './task.actions';
import { Task } from '../model/task.model';

export const initialState: ItemsFeatureState = {
  items: [],
  currentItem: undefined,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskPageActions['[ItemsAPI]ItemsLoaded'], (store, result) => {
    return {
      ...store,
      items: result.data,
    };
  }),
  on(TaskPageActions.createItem, (store: ItemsFeatureState, props) => {
    const newId =
      store.items
        .map((item: Task) => item.id)
        .sort((one, two) => (one > two ? -1 : one < two ? 1 : 0))[0] + 1;

    return {
      ...store,
      items: store.items.concat([{ ...props.item, id: newId }]),
    };
  }),
  on(TaskPageActions.deleteItem, (store: ItemsFeatureState, props) => {
    return {
      ...store,
      items: store.items.filter((item) => item.id !== props.item.id),
    };
  }),
  on(TaskPageActions.getItem, (store: ItemsFeatureState, props) => {
    return {
      ...store,
      currentItem: store.items.find((item) => item.id === props.id),
    };
  }),
  on(TaskPageActions.updateItem, (store: ItemsFeatureState, props) => {
    return {
      ...store,
      items: store.items.map((item) => {
        return item.id === props.item.id ? props.item : item;
      }),
    };
  }),
  on(TaskPageActions.changeOrder, (store: ItemsFeatureState, props) => {
    return {
      ...store,
      items: props.items,
    };
  })
);
