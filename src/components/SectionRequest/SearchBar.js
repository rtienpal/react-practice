import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React from "react"
import { getProjectIdList } from "../../services/requestApiCloud"

export default function SearchBar({ correctToken, setChosenProjectId }) {
  const [filteredData, setFilteredData] = React.useState([])
  const [searchWord, setSearchWord] = React.useState("")
  const [projectIdList, setProjectIdList] = React.useState([])

  React.useEffect(() => {
    getProjectIdList(correctToken, setProjectIdList)
  }, [])

  const handleFilter = (e) => {
    const searchWord = e.target.value
    setSearchWord(searchWord)
    let newFilter = []
    if (searchWord) {
      newFilter = projectIdList.filter((elem) => {
        return elem.toLowerCase().includes(searchWord.toLowerCase())
      })
    }
    setFilteredData(newFilter)
  }

  function clearSearchWord() {
    setFilteredData([])
    setSearchWord("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="searchInput">
        <input
          className="input"
          type="text"
          onChange={handleFilter}
          name="projectId"
          value={searchWord}
        ></input>
        <div className="searchIcon">
          {searchWord ? (
            <CloseIcon id="closeBtn" onClick={clearSearchWord} />
          ) : (
            <SearchIcon />
          )}
        </div>
      </div>
      {filteredData.length > 0 && (
        <div className="dataResults">
          {filteredData.slice(0, 15).map((projectId, key) => {
            return (
              <div
                className="dataResult"
                key={key}
                onClick={() => {
                  setChosenProjectId(projectId)
                  
                }}
              >
                {`${projectId}`}
              </div>
            )
          })}
        </div>
      )}
    </form>
  )
}
