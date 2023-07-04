//const API_URL = "https://api.liferay.cloud/projects/"

export async function confirmToken(
  token,
  setTokenSubmit,
  setCorrectToken
) {
  var myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${token}`)
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  const response = await fetch(
    "https://api.liferay.cloud/projects/",
    requestOptions
  )
  if (!response) {
    setTokenSubmit("Loading...")
  } else if (response.ok) {
    setCorrectToken(token)
    setTokenSubmit("Success!")
  } else {
    setTokenSubmit("Incorrect Token, please try again")
  }
}

export async function getProjectIdList(token, setProjectIdList) {
  var myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${token}`)
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  const response = await fetch(
    "https://api.liferay.cloud/admin/projects/",
    requestOptions
  )
  const customerList = await response.json()

  const regex = /-pro\b|-prd\b/;

  const projectIdList = customerList
    .filter((customer) => regex.test(customer.projectId))
    .map((customer) => customer.projectId)
    setProjectIdList(projectIdList)
}
