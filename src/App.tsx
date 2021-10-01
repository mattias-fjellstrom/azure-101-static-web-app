import React, { useEffect, useState } from "react"
import { TodoItem } from "./models/todoItem"

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { items } = await (await fetch("/api/todos")).json()
      setTodoItems(items)
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {todoItems.map((item, index) => {
          return (
            <p key={index}>
              {item.id} {item.title} {item.done} (priority {item.priority})
            </p>
          )
        })}
      </header>
    </div>
  )
}

export default App
