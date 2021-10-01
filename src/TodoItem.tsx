import React from "react"
import { TodoItemModel } from "./models/todoItem"
import Alert from "react-bootstrap/Alert"
import FormCheck from "react-bootstrap/FormCheck"

interface TodoItemProps {
  item: TodoItemModel
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  return (
    <Alert variant="primary">
      {item.title} <FormCheck />
    </Alert>
  )
}

export default TodoItem
