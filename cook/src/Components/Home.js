import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from "./NavBar";

const divStyle = {
    position : "relative",
    marginLeft : '44%',
    maxWidth : "150px",
  }

function Home() {
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies();
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [people, setPerson] = useState([]);

    useEffect(() => {
        if (cookies.username === undefined) {
            navigate('/');
        }
        axios.get('http://localhost:4000/authenticate', { headers: { "Authorization": `Bearer ${cookies.username}` } }).then(response => {
            console.log(people);
        }).catch(err => {
            console.log(err);
            navigate("/");
        })
        // eslint-disable-next-line
    }, [cookies.username]);

    useEffect(() => {
        if (name.length > 0) {
            axios.post('http://localhost:4000/getartists', {
                name: name
            }).then(response => {
                setPerson([]);
                setPerson(response['data']);
                console.log(people);
            }).catch(err => {
                console.log(err);
            })
        }
        // eslint-disable-next-line
    }, [name]);

    return <div>
        <NavBar/>
        <input placeholder="Type Name" onChange={(e) => { setName(e.target.value) }} style={{position : 'relative', marginTop : "1.5%", width : '20%', marginLeft : '39.5%'}}></input><br />
        <br />
        <div>
            {
                people.map((person,i) => {
                    return (<div key={i}>
                        <Card className="card border-dark mb-3" style={divStyle} >
                            <Card.Body>
                                <Card.Title>{person['username']}</Card.Title>
                                <Button variant="dark" onClick={()=>{navigate("/profile/"+person['id'])}} style = {{position : 'relative',minWidth : '114px'}}>View</Button>
                            </Card.Body>
                        </Card>
                    </div>);
                })
            }
        </div>
    </div>
}

export default Home;