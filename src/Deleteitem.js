import Navbar from './Navbar'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const Deleteitem = () => {

    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [type, setType] = useState('')

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault()
        var name = document.getElementById("hotel").value;
        var item = document.getElementById("item").value;
        console.log(name)
        var requestOptions = {
            method: 'GET',
            headers: {
            }
        };

        fetch("http://localhost:8084/deleteItem?name=" + name +"&item=" + item, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "true") {
                    alert("Item deleted successfully..");
                    history.push(`/Adminoperations`);
                }
            })
            .catch(error => console.log('error', error));

    }

    const fetchType = (e) => {
        setType(e.target.value);
        fetch("http://localhost:8082/getItem?type=" + e.target.value,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    // 'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => response.json())
            .then(result => {
                if(Object.keys(result).length>0){
                setData1(result);
                }
            });
    }

    useEffect(() => {

        fetch("http://localhost:8081/getHotels",
            {
                method: 'GET',
                mode: 'cors',
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
            <h1>Delete item</h1>
            <br></br>
            <div class="create">
            <form onSubmit={handleSubmit}>
                <label>Hotel name:</label>
                <select id="hotel" onChange={fetchType}>
                    {
                        data.map((val) => (
                            <option value={val.Hotelname}>
                                {val.Hotelname}
                            </option>
                        ))
                    }
                </select>
                <label>Item:</label>
                <select id="item">
                    {
                        data1.map((val) => (
                            <option value={val.item}>
                                {val.item}
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

export default Deleteitem;