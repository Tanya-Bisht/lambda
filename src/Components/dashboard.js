import axios from "axios"
import { useEffect, useState } from "react"


export default function Dashboard({ setIsLoggedIn }) {


    const [data, setData] = useState([])
    const [Loading, setLoading] = useState(true)
    useEffect(() => {

        async function dashRender() {

            console.log("Dashboard")

            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    'Authorization': `${token}`,
                    'Origin': 'http://localhost:3000' // Add the 'Origin' header
                }
            };

            try {
                const res = await axios.get("https://962a423kyh.execute-api.ap-south-1.amazonaws.com/dev/dashboard", config)
                const d = res.data.message
                console.log("data",d)
                

                const renderedData = d.map((item, index) => (
                    <div key={index}>
                        <p>Barcode: {item.barcode}</p>
                        <p>TimeStamp: {item.timeStamp}</p>
                        <p>Username: {item.username}</p>
                        <p>Format Name: {item.formatName}</p>
                    </div>
                ));
                setData(renderedData);              
                setLoading(false)

            }
            catch (error) {
                if (error.response.status === 401) {

                    console.log("dash")
                    setIsLoggedIn(false)
                    
                }
                else if (error.response.status === 400) {
                    console.log("data error", error)
                }
            }
        }
        dashRender();
    }, [])





    async function dashboard() {

        const token = localStorage.getItem("token")
        const config = {
            headers: {
                'Authorization': `${token}`,
                'Origin': 'http://localhost:3000' // Add the 'Origin' header
            }
        };
        try {
            const res = await axios.get("https://962a423kyh.execute-api.ap-south-1.amazonaws.com/dev/dashboard", config)
            console.log(res)
            setLoading(false)
        }
        catch (err) {
            console.log("error-------->", err)
            localStorage.removeItem("token")
            setIsLoggedIn(false)
           
        }
    }

    return (
        <>
            <button onClick={dashboard}>Token</button>
            <h1>Dashboard</h1>
            {Loading ? <div>Loading...</div> : data}
        </>
    )
}