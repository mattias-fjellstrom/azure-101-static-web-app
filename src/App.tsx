import React, { useEffect, useState } from "react"
import { TodoItemModel } from "./models/todoItem"
import TodoItem from "./TodoItem"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "bootstrap/dist/css/bootstrap.min.css"
import AddTodoItem from "./AddTodoItem"

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItemModel[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { items } = await (await fetch("/api/todos")).json()
      setTodoItems(items)
    }
    fetchData()
  }, [])

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <h1>Todo App</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddTodoItem />
        </Col>
      </Row>
      {todoItems.map((item) => {
        return (
          <Row>
            <Col>
              <TodoItem item={item} />
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

export default App
