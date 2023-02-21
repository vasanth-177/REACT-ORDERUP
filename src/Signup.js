import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import Logo from './Logo'
import App from './App'

const Signup =  ()=>{

        const history = useHistory();
        const { error, isPending, data } = useFetch('http://localhost:8000/blogs')
        const submit = (e) => {
            e.preventDefault()
            const name = e.target.name.value;
            const password = e.target.password.value;
            const email = e.target.email.value;
            const contact = e.target.contact.value;
            const address = e.target.address.value;

            App.uname=name;

            var raw = JSON.stringify({
                "name": name,
                "password": password,
                "email":email,
                "contact":contact,
                "address":address
            });
            var requestOptions = {
                method: 'POST',
                headers: {},
                body: raw,
                redirect: 'follow'
            };
    
            fetch("http://localhost:8080/register", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.status=== "false"){
                        alert("The Username Already exists");
                    }else{

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
                })
                .catch(error => console.log('error', error));
        }
    

    return (
        <div>
        <Logo />
        <div class="login">
        <form onSubmit={submit}>
            
            <input type="text" className="input" placeholder="Username" id="name"></input>
            <input type="password" className="input" placeholder="Password" id="password"></input>
            <input type="email" className="input" placeholder="Email" id="email"></input>
            <input type="text" className="input" placeholder="Contact" id="contact"></input>
            <input type="text" className="input" placeholder="Address" id="address"></input>

            <div className="sign-in-button">
            <button className="sign-in" >SIGN UP</button>
                <br></br>
                <p><a href="/">Sign In | </a><a href="/Adminlogin"><span> Admin Login</span></a></p>
            </div>
        </form>
        </div>
      </div>
    );
}

export default Signup;