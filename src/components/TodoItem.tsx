import { ITodo } from '../types/todo';

type ITodoItemProps = ITodo & {
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}


const TodoItem: React.FC<ITodoItemProps> = (props) => {
  const {id, title, date, complete, removeTodo, toggleTodo} = props;



  return (
  <div>
    <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)} />
    {title}
    <button onClick={() => removeTodo(id)}>x</button>
  </div>
  )
}
export {TodoItem};