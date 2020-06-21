import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../models/todo";

const token = localStorage.getItem("token");

const httpOptions = {
  headers: new HttpHeaders({
    authentication: token,
  }),
};

@Injectable({
  providedIn: "root",
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<{ todos: Todo[] }>("/api/todo", httpOptions);
  }

  addTodo(msg: string) {
    return this.http.post<{ todo: Todo }>(
      "/api/todo/add",
      { msg },
      httpOptions
    );
  }

  updateTodo(todo: Todo) {
    return this.http.put<{ todo: Todo }>(
      "/api/todo",
      {
        todo,
      },
      httpOptions
    );
  }

  deleteTodo(todo: Todo) {
    return this.http.post<{ todo: Todo }>(
      "/api/todo/delete",
      { todo },
      httpOptions
    );
  }
}
