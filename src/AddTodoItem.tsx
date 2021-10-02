import React, { FormEvent, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { Priority } from "./models/todoItem"

interface AddTodoItemProps {
  addNewTodoItem: (title: string, priority: Priority) => void
}

const AddTodoItem: React.FC<AddTodoItemProps> = ({ addNewTodoItem }) => {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<Priority>(Priority.Low)

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()
    addNewTodoItem(title, priority)
    setTitle("")
    setPriority(Priority.Low)
  }

  return (
    <Card className="mb-5">
      <Card.Header>Add a new todo item</Card.Header>
      <Card.Body>
        <Form onSubmit={(event) => submitForm(event)}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              size="lg"
              type="text"
              placeholder="What is it that you need to do?"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Assign a priority</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                label="Low"
                name="priority"
                type="radio"
                checked={priority === Priority.Low}
                onClick={() => {
                  setPriority(Priority.Low)
                }}
              />
              <Form.Check
                inline
                label="Medium"
                name="priority"
                type="radio"
                checked={priority === Priority.Medium}
                onClick={() => {
                  setPriority(Priority.Medium)
                }}
              />
              <Form.Check
                inline
                label="High"
                name="priority"
                type="radio"
                checked={priority === Priority.High}
                onClick={() => {
                  setPriority(Priority.High)
                }}
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" size="lg">
            Add
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddTodoItem
