import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import Navbar from "./Navbar";
import App from './App'



const Acknowledge = () => {
    const { error, isPending, data } = useFetch('http://localhost:8000/blogs')
    const history = useHistory();

    const handleSubmit= (e) => {
        e.preventDefault()
        var fd=document.getElementById("fback").value;
        
        var raw = JSON.stringify({
            "name": App.uname,
            "feedback":fd
        });
        var requestOptions = {
            method: 'POST',
            headers: {},
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8084/saveFeedback", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status=== "true"){
                    alert("Feedback submitted successfully...");
                }
            })
            .catch(error => console.log('error', error));

    }


    const theFunction= () => {
       console.log("running...")
        for (let [key, value] of Object.entries(data)) {
            for(let [k1,k2] of Object.entries(value)){
            if(k1==="id"){
                fetch('http://localhost:8000/blogs/' + k2, {
                    method: 'DELETE'
                  }).then(console.log("item deleted..")) 
            }
        }
        }
        history.push(`/Useroperations`);
    }

    return (
        <div>

            <Navbar/>
            <h1>Order placed successfully...</h1>
            <div class="info"><br></br>Order details sent through mail...</div><br></br><br></br>
            <form onSubmit={handleSubmit}>
        <label>Feedback:</label>
        <br></br>
        <textarea id="fback"
        ></textarea><br></br>
        <button>Submit</button>
      </form>
      <br></br><br></br>
            <div class="center"><a onClick={theFunction}>Order Further....</a></div>
        </div>
    );
}

export default Acknowledge;