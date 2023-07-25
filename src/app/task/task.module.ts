import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffect } from './effects/task.effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskItemComponent } from './item/task-item.component';
import { taskReducer } from './store/task.reducer';
import { RouterModule } from '@angular/router';

import {
  CdkDropList,
  CdkDrag,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { TaskModalComponent } from './modal/task-modal.component';
import { TaskPageComponent } from './page/list/task-list-page.component';
import { TaskComponent } from './page/one/task-one-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskPageComponent, TaskItemComponent, TaskComponent],
  exports: [TaskPageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('itemsFeature', taskReducer),
    EffectsModule.forFeature([TaskEffect]),
    HttpClientModule,
    MatListModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    TaskModalComponent,
    ReactiveFormsModule,
  ],
})
export class TaskModule {}
