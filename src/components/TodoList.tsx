import { ITodo } from '../types/todo';
import { TodoItem } from './TodoItem';

type ITodoListProps = {
  items: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}


const TodoList: React.FC<ITodoListProps> = (props) => {
  const { items, removeTodo, toggleTodo } = props;

  return (<>
    {
      items.map(todo => (<TodoItem 
          key={todo.id}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          {...todo}
        />))
    }
  </>)
}

export {TodoList}