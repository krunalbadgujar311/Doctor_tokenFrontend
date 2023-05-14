import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchname = this.onChangeSearchname.bind(this);
    this.retrievepatients = this.retrievepatients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivepatients = this.setActivepatients.bind(this);
    this.removeAllpatients = this.removeAllpatients.bind(this);
    this.searchname = this.searchname.bind(this);

    this.state = {
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      searchname: ""
    };
  }

  componentDidMount() {
    this.retrievepatients();
  }

  onChangeSearchname(e) {
    const searchname = e.target.value;

    this.setState({
      searchname: searchname
    });
  }

  retrievepatients() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          patients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievepatients();
    this.setState({
      currentPatient: null,
      currentIndex: -1
    });
  }

  setActivepatients(tutorial, index) {
    this.setState({
      currentPatient: tutorial,
      currentIndex: index
    });
  }

  removeAllpatients() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchname() {
    this.setState({
      currentPatient: null,
      currentIndex: -1
    });

    TutorialDataService.findByTitle(this.state.searchname)
      .then(response => {
        this.setState({
          patients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchname, patients, currentPatient, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchname}
              onChange={this.onChangeSearchname}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchname}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Patients List</h4>

          <ul className="list-group">
            {patients &&
              patients.map((patients, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivepatients(patients, index)}
                  key={index}
                >
                  {patients.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllpatients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPatient ? (
            <div>
              <h4>Patients</h4>
              <div>
                <label>
                  <strong>Patient Name:</strong>
                </label>{" "}
                {currentPatient.name}
              </div>
              <div>
                <label>
                  <strong>Phone No.:</strong>
                </label>{" "}
                {currentPatient.phone}
              </div>
              <div>
                <label>
                  <strong>token:</strong>
                </label>{" "}
                {currentPatient.token ? "token" : "T-001"}
              </div>

              <Link
                to={"/patients/" + currentPatient.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Patient...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}