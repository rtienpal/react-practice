import logo from "./logo.svg"
import "./App.css"
import SearchBar from "./components/SearchBar"
import React from "react"

function App() {
  const [chosenProjectId, setChosenProjectId] = React.useState("123")
  return (
    <div className="App">
      <SearchBar setChosenProjectId={setChosenProjectId} />
    </div>
  )
}

export default App
