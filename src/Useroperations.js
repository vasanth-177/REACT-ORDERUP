import Navbar from './Navbar'
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import App from './App'

import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';

const Useroperations = () => {
    const history = useHistory();
    const [blogs, setBlogs] = useState(null)
    const [isempty, setIsempty] = useState(true)
    // const { error, isPending, data} = useFetch('http://localhost:8000/blogs')
    // console.log("data:",data)
  
    // var b=data
    // const [blogs, setBlogs] = useState(b)
    // console.log("blogs:",blogs)
 
    useEffect(() => {
        fetch('http://localhost:8000/blogs', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(d => {
                setBlogs(d);
                console.log(typeof(d))
                if(Object.keys(d).length>0){
                    setIsempty(false)
                 }else{
                     setIsempty(true)
                 }
            
            
            })
    }, [])


    const placeOrder = (e) => {
        var selectedItemsList = []
        for (let [key, value] of Object.entries(blogs)) {
            var item = "";
            var h_name = ""
            var quantity = ""
            for (let [k1, k2] of Object.entries(value)) {
                if (k1 === "id") {
                    continue
                }
                if (k1 === "item") {
                    item = k2
                }
                if (k1 === "h_name") {
                    h_name = k2
                }
                if (k1 === "quantity") {
                    quantity = k2
                }
            }
            var jsonRequestString = '{"item":"' + item + '","h_name":"' + h_name + '","quantity":"' + quantity + '"}';
            var obj = JSON.parse(jsonRequestString);
            selectedItemsList.push(obj);
        }

        let len = selectedItemsList.length;
        if (len > 0) {

            var raw = JSON.stringify({
                "name": App.uname,
                "orderDetails": selectedItemsList
            });
            console.log(raw)
            var requestOptions = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    // 'Access-Control-Allow-Origin': 'http://localhost:8082',
                    // 'Access-Control-Request-Method': 'POST'
                },
                body: raw,
                mode: 'cors',
                responseType: 'arraybuffer'
            };

            fetch("http://localhost:8083/generateBill", requestOptions)
                .then((response) => response.blob())
                .then((data) => {
                    var fileURL = URL.createObjectURL(data);
                    window.open(fileURL)
                    history.push(`/Acknowledge`);
                });

        }

    }

    const clickHandler = (e) => {
        history.push(`/Orderitems`);
    }

    const showOrders = (e) => {
        history.push(`/Showorders`);
    }

    const handleClick = (id) => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(() => {
            const newBlogs = blogs.filter(blog => blog.id !== id);
            setBlogs(newBlogs);
            if(Object.keys(newBlogs).length>0){
                setIsempty(false)
             }else{
                 setIsempty(true)
             }
        })
    }


    return (
        <div>
            <Navbar />
            <br></br>
            <div>
            <button onClick={clickHandler}>Order items</button>
            <div class="right">
            <button onClick={showOrders}>Recent Orders</button>
            </div>
            </div>
            <hr></hr>
            <div className="home">
                <h1>cart</h1>
                {/*  {error && <div>{error}</div>} */}
                {isempty && <div class="info"><br></br>No items selected...</div>}
                {blogs && <BlogList blogs={blogs} handleClick={handleClick} />}


            </div>
            <br></br><hr></hr><br></br>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
}

export default Useroperations;



