import './general.scss';
import TodoList from './features/todos/TodoList';
import React from 'react';

// json-server --watch data/file.json --port 3500

function App() {
  return (
    <div className="App w-100 vh-100 d-flex justify-content-center align-items-center">
      <TodoList />
    </div>
  );
}

export default React.memo(App);
