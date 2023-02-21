import Navbar from './Navbar'
import { useEffect, useState } from 'react';
import App from './App';
import { Link } from 'react-router-dom';

const Showorders =  ()=>{

    const [data, setData] = useState([])
    const [isempty, setIsempty] = useState(true)
    useEffect(() => {

        fetch("http://localhost:8084/getOrders?name="+App.uname,
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              // 'Access-Control-Allow-Origin': '*'
            }
          })
          .then(response => response.json())
          .then(result => {
            if(result==null){
                console.log("success")
            }else{
            setData(result)
            setIsempty(false)
            }
          });
      }, [])

    return (
        <div>
        <Navbar />
        <h1>Existing orders</h1>
        <div className="blog-list">
        {isempty && <div class="info"><br></br>No Recent orders...</div>}
       {data.map(blog => (
         <div className="blog-preview" key={blog.id} >
            <Link to={`/Orderdetails/${blog.id}`}>
            <h2>OrderID :{ blog.id}</h2>
             <p>Date :{ blog.date }</p>
            </Link>
            
         </div>
       ))}
     </div>
       
       </div>
    );
}

export default Showorders;