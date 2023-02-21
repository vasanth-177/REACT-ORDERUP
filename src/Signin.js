import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import Logo from './Logo'
import App from './App'

const Signin = () => {
    const history = useHistory();
    const { error, isPending, data } = useFetch('http://localhost:8000/blogs')
    const submit = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const password = e.target.password.value;
        App.uname = name;
        var raw = JSON.stringify({
            "name": name,
            "password": password
        });
        var requestOptions = {
            method: 'POST',
            headers: {},
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "false") {
                    alert("Please enter the valid Username and Password");
                } else {
                    // var proj=`{
                    //     "blogs": [
                        
                    //     ]
                    //   }`
                    // const FileSystem = require("fs");
                    // FileSystem.writeFile('orderup/src/data/db.json', JSON.stringify(proj), (error) => {
                    //     if (error) throw error;
                    // });
                   
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
                <div className="sign-in-button">
                    <button className="sign-in">SIGN IN</button>
                    <br></br>
                    <p><a href="/Signup">Sign Up | </a><a href="/Adminlogin"><span> Admin Login</span></a></p>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Signin;