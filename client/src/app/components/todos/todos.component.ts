import { Component, OnInit } from "@angular/core";
import { TodosService } from "../../services/todos.service";
import { Todo } from "src/app/models/todo";
import { Router } from "@angular/router";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService, private router: Router) {}
  ngOnInit(): void {
    this.todosService.getTodos().subscribe((result) => {
      this.todos = result.todos;
    });
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) this.router.navigateByUrl("/login");
  }
  todos: Todo[] = [];
  newTodo: Partial<Todo> = {
    msg: "",
    completed: false,
  };

  addTodo() {
    if (this.newTodo.msg.trim())
      this.todosService.addTodo(this.newTodo.msg).subscribe(({ todo }) => {
        this.todos = [...this.todos, todo];
        this.newTodo.msg = "";
      });
    else this.newTodo.msg = "";
  }

  updateTodo(selectedTodo: Todo) {
    this.todosService.updateTodo(selectedTodo).subscribe(({ todo }) => {
      this.todos = this.todos.map((singleTodo) => {
        if (singleTodo._id === todo._id) return todo;
        return singleTodo;
      });
    });
  }

  deleteTodo(selectedTodo: Todo) {
    this.todosService.deleteTodo(selectedTodo).subscribe(({ todo }) => {
      this.todos = this.todos.filter(
        (singleTodo) => singleTodo._id !== todo._id
      );
    });
  }

  keyDownResponse(event) {
    if (event.keyCode === 13) {
      this.addTodo();
    }
  }
}
