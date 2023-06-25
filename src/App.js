import logo from "./logo.svg"
import "./App.css"
import SearchBar from "./components/SearchBar"
import React from "react"
import { customerList } from "./api/customer-list"

function App() {
  const [chosenProjectId, setChosenProjectId] = React.useState("")
  return (
    <div className="App">
      {chosenProjectId ? (
        <div>{JSON.stringify(customerList.filter((elem) => elem.projectId === chosenProjectId))}</div>
      ) : (
        <SearchBar setChosenProjectId={setChosenProjectId} />
      )}
    </div>
  )
}

export default App
