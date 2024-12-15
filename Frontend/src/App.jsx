import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout1 from "./components/Layout1/Layout1";
import Layout from "./components/Layout/Layout";
import Layout2 from "./components/Layout2/Layout2";
import AdminDashboard from "./pages/AdminDashboard";
import Course2 from "./pages/Courses2";
import Courses from "./pages/Courses";
import MainComponent2 from "./MainComponent2";
import AdminStudentList from "./pages/AdminStudentList";
import Gallery from "./pages/Gallery";
import Gallery2 from "./pages/Gallery2";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Layout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
         <Route path="gallery" element={<Gallery/>}/>
        </Route>

        <Route path="/user" element={<Layout1 />}>
         <Route path="gallery2" element={<Gallery2/>}/>
        <Route path="home" element={<MainComponent2/>}/>
        <Route path="courses2" element={<Course2/>}/> 
        </Route>

        <Route path="/admin" element={<Layout2/>}>
         <Route path="courses" element={<Courses/>}/>
         <Route path="adminhome" element={<AdminDashboard/>}/>
         <Route path="students" element={<AdminStudentList/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
