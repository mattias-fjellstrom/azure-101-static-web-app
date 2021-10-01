import React, { useEffect, useReducer, useState } from "react"
import { Priority, TodoItemModel } from "./models/todoItem"
import TodoItem from "./TodoItem"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Toast from "react-bootstrap/Toast"
import "bootstrap/dist/css/bootstrap.min.css"
import AddTodoItem from "./AddTodoItem"

interface State {
  todoItems: TodoItemModel[]
}

interface BaseAction<T extends string> {
  readonly type: T
}

interface AddAction extends BaseAction<"ADD"> {
  readonly data: TodoItemModel
}

interface DeleteAction extends BaseAction<"DELETE"> {
  readonly data: {
    readonly id: string
  }
}

interface UpdateAction extends BaseAction<"UPDATE"> {
  readonly data: TodoItemModel
}

interface ListAction extends BaseAction<"LIST"> {
  readonly data: TodoItemModel[]
}

type Action = AddAction | DeleteAction | UpdateAction | ListAction

const initialState: State = {
  todoItems: [],
}

const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "LIST":
      return { todoItems: action.data }
    case "ADD":
      return { todoItems: [...state.todoItems, action.data] }
    case "UPDATE":
      const items = (state.todoItems ?? []).filter(
        (item) => item.id !== action.data.id
      )
      return { todoItems: [...items, action.data] }
    case "DELETE":
      return {
        todoItems: state.todoItems.filter((item) => item.id !== action.data.id),
      }
    default:
      return { ...state }
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [high, setHigh] = useState(0)
  const [medium, setMedium] = useState(0)
  const [low, setLow] = useState(0)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/todos")
      const body = await response.json()
      dispatch({ type: "LIST", data: body.items })
    }
    fetchData()
  }, [])

  useEffect(() => {
    setHigh(
      state.todoItems.filter((item) => item.priority === Priority.High).length
    )
    setMedium(
      state.todoItems.filter((item) => item.priority === Priority.Medium).length
    )
    setLow(
      state.todoItems.filter((item) => item.priority === Priority.Low).length
    )
  }, [state.todoItems])

  const addNewTodoItem = async (title: string, priority: Priority) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, priority }),
    })

    const item = await response.json()
    dispatch({ type: "ADD", data: item })
  }

  const deleteTodoItem = async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })

    if (response.status === 200) {
      dispatch({ type: "DELETE", data: { id } })
    } else {
      setShowError(true)
    }
  }

  return (
    <>
      {showError && (
        <Toast className="d-inline-block m-1" bg="danger">
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>You are not allowed to do that operation</Toast.Body>
        </Toast>
      )}
      <Container fluid="md">
        <Row>
          <Col>
            <h1 className="mb-3 mt-3">Todo App</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddTodoItem addNewTodoItem={addNewTodoItem} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>High priority ({high})</h2>
          </Col>
        </Row>
        {state.todoItems
          .filter((item) => item.priority === Priority.High)
          .map((item) => {
            return (
              <Row>
                <Col>
                  <TodoItem item={item} deleteTodoItem={deleteTodoItem} />
                </Col>
              </Row>
            )
          })}
        <Row>
          <Col>
            <h2>Medium priority ({medium})</h2>
          </Col>
        </Row>
        {state.todoItems
          .filter((item) => item.priority === Priority.Medium)
          .map((item) => {
            return (
              <Row>
                <Col>
                  <TodoItem item={item} deleteTodoItem={deleteTodoItem} />
                </Col>
              </Row>
            )
          })}
        <Row>
          <Col>
            <h2>Low priority ({low})</h2>
          </Col>
        </Row>
        {state.todoItems
          .filter((item) => item.priority === Priority.Low)
          .map((item) => {
            return (
              <Row>
                <Col>
                  <TodoItem item={item} deleteTodoItem={deleteTodoItem} />
                </Col>
              </Row>
            )
          })}
      </Container>
    </>
  )
}

export default App
