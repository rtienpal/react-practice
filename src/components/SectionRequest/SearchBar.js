import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React, { useState, useEffect, useRef } from "react"
import { getProjectIdList } from "../../services/requestApiCloud"

export default function SearchBar({ correctToken, setChosenProjectId }) {
  const [filteredData, setFilteredData] = useState([])
  const [searchWord, setSearchWord] = useState("")
  const [projectIdList, setProjectIdList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef(null)

  useEffect(() => {
    getProjectIdList(correctToken, setProjectIdList)
  }, [correctToken])

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
    setSelectedIndex(-1) // Reset the selected index when the filter changes
  }

  const clearSearchWord = () => {
    setFilteredData([])
    setSearchWord("")
    setSelectedIndex(-1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleKeyDown = (e) => {
    const { keyCode } = e

    switch (keyCode) {
      case 38: // UP arrow key
        e.preventDefault()
        setSelectedIndex((prevIndex) =>
          prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1
        )
        break
      case 40: // DOWN arrow key
        e.preventDefault()
        setSelectedIndex((prevIndex) =>
          prevIndex === filteredData.length - 1 ? 0 : prevIndex + 1
        )
        break
      case 13: // ENTER key
        e.preventDefault()
        if (selectedIndex !== -1 && filteredData.length > 0) {
          setChosenProjectId(filteredData[selectedIndex])
        }
        break
      case 27: // ESC key
        e.preventDefault()
        clearSearchWord()
        break
      default:
        break
    }
  }

  const handleMouseOver = (index) => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    if (dropdownRef.current && selectedIndex !== -1) {
      const selectedItem = dropdownRef.current.querySelector(".selected")
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <>
      <h2 className="searchText">Inform ProjectId</h2>
      <form onSubmit={handleSubmit}>
        <div className="searchInput">
          <input
            className="input"
            type="text"
            onChange={handleFilter}
            name="projectId"
            value={searchWord}
            placeholder="Project Id"
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
          <div className="dataResults" ref={dropdownRef}>
            {filteredData.slice(0, 15).map((projectId, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  className={`dataResult ${isSelected ? "selected" : ""}`}
                  key={index}
                  onClick={() => {
                    setChosenProjectId(projectId)
                  }}
                  onMouseOver={() => handleMouseOver(index)}
                >
                  {`${projectId}`}
                </div>
              )
            })}
          </div>
        )}
      </form>
    </>
  )
}
