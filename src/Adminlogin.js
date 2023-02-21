import { useHistory } from "react-router-dom";
import Logo from './Logo'
import App from './App'

const Adminlogin = () => {

    const history = useHistory();
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

        fetch("http://localhost:8080/adminlogin", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "false") {
                    alert("Please enter the valid Adminname and Password");
                } else {
                    history.push(`/Adminoperations`);
                }
            })
            .catch(error => console.log('error', error));
    }



    return (
        <div>
            <Logo />
            <div class="login">
            <form onSubmit={submit}>

                <input type="text" className="input" placeholder="Adminname" id="name"></input>
                <input type="password" className="input" placeholder="Password" id="password"></input>
                <div className="sign-in-button">
                    <button className="sign-in">LOGIN</button>
                    <br></br>
                    <p><a href="/">Sign In | </a><a href="/Signup">Sign Up </a></p>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Adminlogin;