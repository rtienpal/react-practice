import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import { projectIdList } from "../api/customer-list"
import React from "react"

export default function SearchBar({ setChosenProjectId }) {
  const [filteredData, setFilteredData] = React.useState([])
  const [searchWord, setSearchWord] = React.useState("")
  

  const handleFilter = (event) => {
    const searchWord = event.target.value
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

  return (
    <form>
      <div className="searchInputs">
        <input
          className="input"
          type="text"
          //placeholder={placeholder}
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

                  // setChosenCity(city.apiCityId)
                  // handleClickCity()
                  // clearSearchWord()
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
