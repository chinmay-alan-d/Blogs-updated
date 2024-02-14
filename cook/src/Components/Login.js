import { useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [username,setusername] = useState("");
    const [pwd,setPwd] = useState("");
    // eslint-disable-next-line
    const [cookies,setCookies] = useCookies();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/login",{
          username : username,
          password : pwd
        }).then((response)=>{
          setCookies("username",response['data']['token']);
          setCookies("name",response['data']['name']);
          navigate('/home');
        }).catch((err)=>{
          navigate('/');
        })
    }
    const handleSignUp = ()=>{
      navigate("/signup")
    }

    const formStyle = {
      maxWidth: '400px',
      border: '2px solid #60a3bc',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#60a3bc',
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="card-body mx-auto card"  onSubmit={handleSubmit} style={formStyle  }>
            <input type='text' placeholder="UserName" onChange={(event)=> setusername(event.target.value)} required></input><br /><br />
            <input type='password' placeholder="Password" onChange={(event)=> setPwd(event.target.value)} required></input><br /><br />
            <button className="btn btn-primary">Log In</button><br/>
            <button className="btn btn-primary" onClick={handleSignUp}>SignUp insertead?</button>
        </form>
    </div>
    );
  }
  
  export default Login;
  