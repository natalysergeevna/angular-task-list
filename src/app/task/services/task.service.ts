import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getItems(): Observable<TaskList> {
    return this.httpClient.get<TaskList>('assets/api/data.json');
  }
}
