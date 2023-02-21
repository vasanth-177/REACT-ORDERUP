import Navbar from "./Navbar";
import { useState} from "react";
import { useHistory } from "react-router-dom";

const Orderitems = () => {
    const history = useHistory();
    const [h_name, setType] = useState('');
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    
    const myrange = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];

    const addItem = (e) =>{
    var item=document.getElementById("item").value;
    var quantity=document.getElementById("quantity").value;
    const blog = { item, h_name, quantity };
   
    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(console.log("Successfully Added.."))
    alert("Item Added Successfully...");
  }

    const fetchItem = (e) => {
        setType(document.getElementById("hotel").value)
        fetch("http://localhost:8082/getItem?type=" + document.getElementById("hotel").value,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    // 'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => response.json())
            .then(result => {
                setData1(result);
            });
    }

    const showItem = (e) =>{
        history.push(`/Useroperations`);
    }
    const fetchType = (e) => {
        // setType(e.target.value);
        fetch("http://localhost:8081/" + e.target.value,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    // 'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => response.json())
            .then(result => {
                setData(result);
            });
    }

    const dispItem = (e) => {
        // setType(e.target.value);
        setType(document.getElementById("hotel").value);
        var a=[];
        fetch("http://localhost:8082/getItem?type=" + document.getElementById("hotel").value,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    // 'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => response.json())
            .then(result => {
                var k=result;
                for (let [key, value] of Object.entries(k)) {
                    if(parseInt(value.price,10)<parseInt(e.target.value,10))
                    {
                       a.push(value); 
                    }
                }
                setData1(a);
            });
    }


    return (
        <div>
            <Navbar />
            <br></br>
            <label>Filter by Hotel type: </label><br></br>
            <select
                //   value={type}
                onChange={fetchType}
            >
                <option value="getHotels">All Hotels</option>
                <option value="getVegHotels">Vegetarian Hotels</option>
                <option value="getNonVegHotels">Non-Vegetarian Hotels</option>
                <option value="getBothHotels">Both Hotels</option>
            </select>
            {/* <Hotelname /> */}
            <div>
                <h1>Hotel List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Hotel Name</th>
                            <th>Hotel Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((val) => (
                                <tr>
                                    <td>{val.Hotelname}</td>
                                    <td>{val.Type}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <br></br><br></br>
                <hr></hr>
                <br></br>
                <label>Hotel: </label>
                <div class="right">
                <label>Filter by Rate: </label>
                </div>
                <div>
                <select id="hotel">
                    {
                        data.map((val) => (
                            <option value={val.Hotelname}>
                                {val.Hotelname}
                            </option>
                        ))
                    }
                </select>
               
               <div class="right">
                <select
                //   value={type}
                onChange={dispItem}>
                <option value="350">Less than 350</option>
                <option value="300">Less than 300</option>
                <option value="200">Less than 200</option>
                <option value="100">Less than 100</option>
                <option value="50">Less than 50</option>
            </select>
            </div>
            
            </div>
            <button onClick={fetchItem}>Show Menu</button>
            <h1>Item List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data1.map((val) => (
                                <tr>
                                    <td>{val.item}</td>
                                    <td>{val.price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <br></br><br></br>
                <label>Item: </label>
                <div class="right"><label>Quantity: </label></div>
                <div>
                <select id="item">
                    {
                        data1.map((val) => (
                            <option value={val.item} >
                                {val.item}
                            </option>
                        ))
                    }
                </select>
                <div class="right">
                <select id="quantity">
                    {
                        myrange.map((val) => (
                            <option value={val}>
                                {val}
                            </option>
                        ))
                    }
                </select>
                </div>
                </div>
                <br></br><br></br>
                <hr></hr>
                <br></br>
                <button onClick={addItem}>Add Item</button>
               <div class="right">
                <button onClick={showItem}>Show cart</button>
                </div>
                <br></br><br></br>
                <hr></hr>
            </div>
        </div>
    );
}

export default Orderitems;
