import React, { useState, useEffect, useRef, useContext } from 'react';
import { ITodo } from '../types/todo';
import { TodoList } from "../components/TodoList";
import cn from 'classnames';
import { ThemeContext } from '../context/ThemeContext';

export const Todos: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { darkMode } = useContext(ThemeContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.key === "Enter" && addTodo();

  }

  const addTodo = () => {
    if (value) {
    setTodos([...todos, {
      id: Date.now(),
      title: value,
      complete: false,
      //case and cost
    }]);
    setValue('');
  }
  }

  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ...todo, complete: !todo.complete
      }
    }))
  }

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    document.title = 'Задачи';
  }, [])

  return (
    <div className={cn({
        'bg-dark': darkMode,
        'text-white': darkMode,
      }
                    )}
      style={{minHeight: "100vh", padding: "80px 0"}}>
      <div>
        <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef} />
        <button onClick={addTodo}>добавить задачу</button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}
