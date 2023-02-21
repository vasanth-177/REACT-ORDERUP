import Navbar from './Navbar'
import { useHistory } from "react-router-dom";


const Addhotel =  ()=>{

  const history = useHistory();
  const handleSubmit= (e) => {
    e.preventDefault()
    var name=document.getElementById("name").value;
    var type=document.getElementById("type").value;
    var raw = JSON.stringify({
        "name": name,
        "type":type
    });
    var requestOptions = {
        method: 'POST',
        headers: {},
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8084/addHotel", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status=== "true"){
                alert("Hotel Added successfully..");
                history.push(`/Adminoperations`);
            }
        })
        .catch(error => console.log('error', error));

}
   

    return (
        <div>
        <Navbar />
        <br></br>
        <h1>Add hotel</h1>
        <br></br>
        <div class="create">
        <form onSubmit={handleSubmit}>
        <label>Hotel name:</label>
        <input 
          type="text" 
          id="name"
        />
        <label>Hotel type:</label>
        <select
          id="type"
        >
          <option value="Veg">Vegetarian</option>
          <option value="Non-veg">Non-Vegeterian</option>
          <option value="Veg/Non-veg">Vegetarian/Non-Vegeterian</option>
        </select>
        <button>Add</button>
      </form>
      </div>
       </div>
    );
}

export default Addhotel;