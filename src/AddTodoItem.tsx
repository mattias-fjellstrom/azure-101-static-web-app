import React, { FormEvent, useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { Priority } from "./models/todoItem"

const AddTodoItem: React.FC = () => {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<Priority>(Priority.Low)

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, priority }),
    })
  }

  return (
    <Card className="mb-5">
      <Card.Header>Add a new todo item</Card.Header>
      <Card.Body>
        <Form onSubmit={(event) => submitForm(event)}>
          <Form.Group className="mb-3">
            <Form.Label>Give your todo item a title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="What should you do?"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Give your todo item a priority</Form.Label>
            <div className="mb-5">
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

          <Button variant="primary" type="submit">
            Add todo item
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddTodoItem
