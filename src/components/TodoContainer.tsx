import Header from './Header'
import InputTodo from './InputTodo'
import TodosList from './TodosList'
// import uuid from "uuid";
import { useTodosStore } from '../store'

function TodoContainer() {
  const { todos, deleteTodo, updateTodo } = useTodosStore()

  return (
    <div className="container">
      <Header />
      <InputTodo />
      <TodosList
        todos={todos}
        handleChangeProps={updateTodo}
        deleteTodoProps={deleteTodo}
      />
    </div>
  )
}

export default TodoContainer
