import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const formStyle = {
    position : 'absolute',
    top : '15%',
    marginLeft : '40%',
    minHeight : "100px",
    borderRadius : "8px"
}

function MyBlogs(){
    const [content,setContent] = useState("");
    // eslint-disable-next-line
    const [cookies,setCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(()=>{
        if (cookies.username === undefined) {
            navigate('/');
        }
        axios.get('http://localhost:4000/authenticate', { headers: { "Authorization": `Bearer ${cookies.username}` } }).then(response => {

        }).catch(err => {
            console.log(err);
            navigate("/");
        })
    // eslint-disable-next-line
    },[cookies.username]);

    const handleSubmit = (e)=> {
        e.preventDefault();
        let username = cookies.name;
        let token = cookies.username;
        axios.post("http://localhost:4000/create",{
            username : username,
            token : token,
            content : content
        }).then(response=>{
            console.log(response);
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <div>
            <NavBar/>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input placeholder="Write New" onChange={(e)=>{setContent(e.target.value)}} style={{}}></input><br/>
                <button style={{position : 'relative', top : '12px', border : "InactiveCaption",backgroundColor:"black",color : "white",borderRadius : '8px'}}>Submit</button>
            </form>
        </div>
    ); 
}

export default MyBlogs;