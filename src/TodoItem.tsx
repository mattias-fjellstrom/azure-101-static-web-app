import React from "react"
import { Priority, TodoItemModel } from "./models/todoItem"
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

interface TodoItemProps {
  item: TodoItemModel
  deleteTodoItem: (id: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ item, deleteTodoItem }) => {
  const priority = (value: Priority): string => {
    if (value === Priority.Low) {
      return "secondary"
    } else if (value === Priority.Medium) {
      return "primary"
    } else {
      return "danger"
    }
  }

  const deleteItem = async (id: string) => {
    deleteTodoItem(id)
  }

  return (
    <Alert
      className="d-flex align-items-center"
      variant={priority(item.priority)}
    >
      <Container>
        <Row>
          <Col>{item.title}</Col>
          <Col md="auto">
            <Button
              variant="danger"
              type="submit"
              size="lg"
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    </Alert>
  )
}

export default TodoItem
