import Navbar from './Navbar'
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";

const Orderdetails =  ()=>{
    const { id } = useParams();
    const [data,setData]=useState([])
    useEffect(() => {

        fetch("http://localhost:8084/getOrders?id="+id,
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              // 'Access-Control-Allow-Origin': '*'
            }
          })
          .then(response => response.json())
          .then(result => {
            var k=JSON.parse(result)
            console.log(k)
            setData(k)
          });
      }, [])
  
  
    return (
        <div>
        <Navbar />
        <h1>Order Details :</h1>
        <div className="blog-list">
       {data.map(blog => (
         <div className="blog-preview" key={blog.id} >
             <h2>Item :{ blog.item}</h2>
             <p>Quantity :{ blog.quantity}</p><br></br>
             <p>Hotel :{ blog.h_name }</p>
         </div>
       ))}
     </div>
       
       </div>
    );
}

export default Orderdetails;