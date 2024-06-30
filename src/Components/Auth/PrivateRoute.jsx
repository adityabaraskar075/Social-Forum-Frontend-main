import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const authToken = localStorage.getItem("authToken")
    console.log(authToken)
    if(authToken!=null) return children
    else return <Navigate to="/login"/>
  return (<div></div>)
}

export default PrivateRoute