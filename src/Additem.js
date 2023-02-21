import Navbar from './Navbar'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const Additem = () => {
  const [data, setData] = useState([])
  const history = useHistory();

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


  

  const handleSubmit = (e) => {
    e.preventDefault()
    var name = document.getElementById("hotel").value;
    var item = document.getElementById("item").value;
    var price = document.getElementById("price").value;

    var raw = JSON.stringify({
      "name": name,
      "item": item,
      "price":price
    });
    var requestOptions = {
      method: 'POST',
      headers: {},
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8084/addItem", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "true") {
          alert("Item addded successfully...");
          history.push(`/Adminoperations`);
        }
      })
      .catch(error => console.log('error', error));

  }



  return (
    <div>
      <Navbar />
      <br></br>
      <h1>Add item</h1>
      <br></br>
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
        <label>Item:</label>
        <input
          type="text"
          id="item"
        />
        <label>Price:</label>
        <input
          type="text"
          id="price"
        />
        <button>Add</button>
      </form>
      </div>
    </div>
  );
}

export default Additem;