import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import MyBlogs from "./Components/MyBlogs";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Login />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/create" element={<MyBlogs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
