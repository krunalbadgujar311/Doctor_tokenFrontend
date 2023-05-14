import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,BrowserRouter,Router,Route,Routes} from "react-router-dom";
import "./App.css"
import AddTutorial from "./components/add-tutorial-component";
import Tutorial from "./components/tutorial-component";
import TutorialsList from "./components/tutorials-list-component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/patients" className="navbar-brand">
            Token System
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/patients"} className="nav-link">
                Patients
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Patients
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/patients" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/patients/:id" element={<Tutorial/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;