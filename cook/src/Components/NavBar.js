import Button from "react-bootstrap/esm/Button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';


function NavBar() {
    // eslint-disable-next-line
    const [cookies, setCookie,removeCookie] = useCookies();
    const navigate = useNavigate();
    const handleLogoutClick = ()=>{
        removeCookie('username');
        removeCookie('name');
        navigate('/');
    }

    return <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{marginLeft : "40%"}}>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">Blogs.</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/create">create</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Login</Link>
                        </li>
                        <li className="nav-item active">
                            <Button className="nav-link" onClick={handleLogoutClick}>Logout</Button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </>
}

export default NavBar;