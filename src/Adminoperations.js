import Navbar from './Navbar'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
// import Addhotel from './Addhotel'
// import Additem from './Additem'
// import Deletehotel from './Deletehotel'
// import Deleteitem from './Deleteitem'

const Adminoperations =  ()=>{

    const [data, setData] = useState([]);
    const history = useHistory();

    const addHotel = (e) => {
        history.push(`/Addhotel`);
    }
    const addItem = (e) => {
        history.push(`/Additem`);
    }
    const deleteHotel = (e) => {
        history.push(`/Deletehotel`);
    }
    const deleteItem = (e) => {
        history.push(`/Deleteitem`);
    }

    useEffect(() => {

        fetch("http://localhost:8084/getFeedback",
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
      }, [])
    

    return (
        <div>
        <Navbar />
        <br></br>
       <button onClick={addHotel}>Add Hotel</button>
       <div class="space"></div>
       <button onClick={addItem}>Add Item</button>
       <div class="space"></div>
       <button onClick={deleteHotel}>Delete Hotel</button>
       <div class="space"></div>
       <button onClick={deleteItem}>Delete Item</button>
       <br></br><br></br>
       <h1>Feedback:</h1>
       <div className="blog-list">
       {data.map(blog => (
         <div className="blog-preview" key={blog.id} >
             <h2>{ blog.name }</h2>
             <p>{ blog.feedback }</p>
         </div>
       ))}
     </div>
       </div>
    );
}

export default Adminoperations ;