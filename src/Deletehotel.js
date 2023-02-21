import Navbar from './Navbar'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const Deletehotel = () => {

    const [data, setData] = useState([])

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault()
        var name = document.getElementById("hotel").value;
        console.log(name)
        var requestOptions = {
            method: 'GET',
            headers: {
            }
        };

        fetch("http://localhost:8084/deleteItem?name=" + name, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "true") {
                    alert("Hotel deleted successfully..");
                    history.push(`/Adminoperations`);
                }
            })
            .catch(error => console.log('error', error));

    }

    useEffect(() => {
        fetch("http://localhost:8081/getHotels",
            {
                method: 'GET',
                // mode: 'cors',
                headers: {
                    // 'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => response.json())
            .then(result => {
                setData(result)

            });
    }, [])

    return (
        <div>
            <Navbar />
            <br></br>
            <h1>Delete hotel</h1><br></br>
            <div class="create">
            <form onSubmit={handleSubmit}>
                <label>Hotel name:</label>
                <select id="hotel">
                    {
                        data.map((val) => (
                            <option value={val.Hotelname}>
                                {val.Hotelname}
                            </option>
                        ))
                    }
                </select>

                <button>Delete</button>
            </form>
            </div>
        </div>
    );
}

export default Deletehotel;