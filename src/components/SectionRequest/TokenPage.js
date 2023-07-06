import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React from "react"
import { confirmToken } from "../../services/requestApiCloud"

export default function TokenPage({ setCorrectToken }) {
  const [searchToken, setSearchToken] = React.useState("")
  const [token, setToken] = React.useState("")
  const [tokenSumbmit, setTokenSubmit] = React.useState("")
  const [tokenSubmitClicked, setTokenSubmitClicked] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleFilter = (e) => {
    setSearchToken(e.target.value)
  }

  function clearSearchToken() {
    setSearchToken("")
  }

  React.useEffect(() => {
    confirmToken(token, setTokenSubmit, setCorrectToken)
  }, [token])

  const handleSubmitClick = async () => {
    setToken(searchToken)
    setTokenSubmit("Loading...")
    setTokenSubmitClicked(true)
    await confirmToken(token, setTokenSubmit, setCorrectToken)

    // try {
    //   await confirmToken(searchToken, setToken, () => setTokenSubmit, setCorrectToken);
    // } catch (error) {
    //   // Handle error if needed
    // }
  }

  return (
    <>
      <h1>Inform Liferay Cloud Token</h1>
      <form onSubmit={handleSubmit}>
        <div className="searchInput">
          <input
            className="input"
            type="text"
            name="token"
            value={searchToken}
            onChange={handleFilter}
            placeholder="Liferay Cloud Token"
          ></input>
          <div className="searchIcon">
            {searchToken ? (
              <CloseIcon id="closeBtn" onClick={clearSearchToken} />
            ) : (
              <SearchIcon />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="submitButton"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      {tokenSumbmit && tokenSubmitClicked ? (
        <div>{tokenSumbmit}</div>
      ) : (
        <div></div>
      )}
    </>
  )
}
