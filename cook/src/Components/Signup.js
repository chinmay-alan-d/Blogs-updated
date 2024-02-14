import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username,setusername] = useState("");
    const [pwd,setPwd] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = fetch('http://localhost:4000/signup',{
          method : "POST",
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username : username,password : pwd}),
        });
        console.log(response);
        navigate("/");
    }

    const handleLogin = ()=>{
      navigate("/")
    }

    const formStyle = {
      maxWidth: '400px',
      border: '2px solid #60a3bc',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#60a3bc', 
    };

    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="card-body mx-auto card"  onSubmit={handleSubmit} style={formStyle  }>
            <input type='text' placeholder="UserName" onChange={(event)=> setusername(event.target.value)} required></input><br /><br />
            <input type='password' placeholder="Password" onChange={(event)=> setPwd(event.target.value)} required></input><br /><br />
            <button className="btn btn-primary">Signup</button><br/>
            <button className="btn btn-primary" onClick={handleLogin}>Login insertead?</button>
        </form>
    </div>
}

export default Signup;