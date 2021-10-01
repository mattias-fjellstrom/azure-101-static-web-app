import React, { useEffect, useState } from "react"

const App: React.FC = () => {
  const [data, setData] = useState("No data")

  useEffect(() => {
    const fetchData = async () => {
      const { text } = await (await fetch("/api/todos")).json()
      setData(text)
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>{data}</p>
      </header>
    </div>
  )
}

export default App
