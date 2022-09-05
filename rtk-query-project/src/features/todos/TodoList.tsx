import React, { FormEvent, useState } from "react";
import { 
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation 
} from "../api/apiSlice";

const TodoList = () => {

  const [newTodo, setNewTodo] = useState('');

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
    // da mettere void in slice come 2o argomento se non si hanno params qui
  } = useGetTodosQuery();
  const [ addTodo ] = useAddTodoMutation();
  const [ updateTodo ] = useUpdateTodoMutation();
  const [ deleteTodo ] = useDeleteTodoMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false })
    setNewTodo('');
  }

  const newItemSection = 
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input 
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter new todo here' 
        />
        <button className="submit">
          <i className="fa-solid fa-upload"></i>
        </button>
      </div>
    </form>

    let content;
    // Content condizionale
    if(isLoading){
      content = <h3>Loading...</h3>
    } else if(isSuccess){
      content = todos.map(todo => {
        return (
          <article key={todo.id} className='d-flex w-100 justify-content-center align-items-center my-1 p-3' style={{'gap': '1rem', 'backgroundColor': 'lightgreen', 'borderRadius': '10px'}}>
            <div className="todo d-flex align-items-center" style={{'gap': '.5rem'}}>
              <input 
                type='checkbox'
                checked={todo.completed}
                id={`${todo.id}`}
                onChange={() => updateTodo({...todo, completed: !todo.completed})}
              />
              <label htmlFor={`${todo.id}`}>{todo.title}</label>
            </div>
            <button className="trash px-2 text-danger" onClick={() => deleteTodo({ id: todo.id})}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </article>
        );
      })
    } else if (isError){
      if(typeof error === 'string'){
        content = <h3>{error}</h3>
      } else if (error instanceof Error){
        content = <h3>{error.message}</h3>
      }
    }

  return (
    <main className="w-100 vh-100 d-flex flex-column justify-content-start align-items-center p-5">
      <h1>Todo list</h1>
      {newItemSection}
      <div className="w-50 d-flex flex-column justify-content-center align-items-center p-5">
        {content}
      </div>
    </main>
  );
}

export default React.memo(TodoList);