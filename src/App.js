import './App.css';
import Login from './components/Login/Login'
import CreateDB from './components/CreateDB/CreateDB'
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import ViewAPI from './components/ViewAPI/ViewAPI'
import API from './components/API/API'
import Collection from './components/Collection/Collection'
import Contact from './components/Contact/Contact'
import { Route, Routes } from "react-router";
import { BrowserRouter as Router, Outlet, Navigate } from "react-router-dom";

function App() {
  return (

      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createdb" element={<CreateDB />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewapi" element={<ViewAPI />} />
          <Route path="/api" element={<API />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;