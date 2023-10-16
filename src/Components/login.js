import { useState} from "react"
import "./login.css"
import axios from "axios"

export default function Login({setIsLoggedIn}) {

    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    async function userLogin() {

        console.log(username, password)
        try {
            const response = await axios.post("https://962a423kyh.execute-api.ap-south-1.amazonaws.com/dev/user", { username, password }, {
                'Origin': 'http://localhost:3000', // Set the desired origin
            })
            const token = response.data.token
            localStorage.setItem("token", token)
            setIsLoggedIn(true)
        }
        catch (err) {
            if (err.response.data.error === 'Wrong Username Or Password') {
                window.alert("please enter valid username or password")
            }
            else if (err.response.data.error === 'Error logging in.') {
                {
                    window.alert("please fill the fields")
                }

            }
        }


    }

   



    return (
        <div className="barcode-scanner-login">
            <form className="loginform" onSubmit={(e) => {
                console.log(username, password)
                e.preventDefault()
            }}>
                <div className="login-page-header">Login Page</div>
                <input onChange={(e) => {
                    setUsername(e.target.value)

                }} placeholder="username" value={username} name="Username"></input>

                <input onChange={(e) => {
                    setPassword(e.target.value)

                }} placeholder="password" value={password} name="password"></input>
                <button onClick={userLogin}>Login</button>
            </form>
        </div>

    )
}