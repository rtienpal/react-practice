import "./App.css"
import SearchBar from "./components/SectionRequest/SearchBar"
import React from "react"
import TokenPage from "./components/SectionRequest/TokenPage"


function App() {
  const [chosenProjectId, setChosenProjectId] = React.useState("")
  const [correctToken, setCorrectToken] = React.useState("")
  return (
    <div className="App">
      {correctToken ? (
        <SearchBar
          correctToken={correctToken}
          setChosenProjectId={setChosenProjectId}
        />
      ) : (
        <TokenPage setCorrectToken={setCorrectToken} />
      )}

      {/* {chosenProjectId ? (
        <div>{JSON.stringify(customerList.filter((elem) => elem.projectId === chosenProjectId))}</div>
      ) : (
        <SearchBar setChosenProjectId={setChosenProjectId} />
      )} */}
    </div>
  )
}

export default App
