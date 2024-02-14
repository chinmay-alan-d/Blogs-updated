import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavBar from "./NavBar";

function Profile(){
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();
    const [blogs,setBlog] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        let id = window.location.pathname.split('/');
        id = id[id.length-1];
        const response = await axios.post("http://localhost:4000/getBlogs",{
            id : id
        });
        setBlog(response['data']);
      };    

    useEffect(() => {
        if (cookies.username === undefined) {
            navigate('/');
        }
        axios.get('http://localhost:4000/authenticate', { headers: { "Authorization": `Bearer ${cookies.username}` } }).then(response => {
        }).catch(err => {
            navigate("/");
        })
        // eslint-disable-next-line
    }, [cookies.username]);
    return (
        <div>
        <NavBar/>
        <br/>
        <div>
            {
                blogs.map((blog,i)=>{
                    return (
                        <div>
                            <div key = {i} style = {{width: "320px",minHeight: "50px",padding: "10px" ,marginLeft : '40%',border : '1px solid black',borderStyle: "dotted"}}>
                                <p>{blog}</p>
                            </div>
                            <br/>
                        </div>
                    )
                })
            }
        </div>
        </div>
    );
}

export default Profile;