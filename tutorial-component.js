import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from '../common/with-router';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.getpatients = this.getpatients.bind(this);
    this.updatetoken = this.updatetoken.bind(this);
    this.updatepatients = this.updatepatients.bind(this);
    this.deletepatients = this.deletepatients.bind(this);

    this.state = {
      currentPatient: {
        id: null,
        name: "",
        phone: "",
        token: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getpatients(this.props.router.params.id);
  }

  onChangename(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          name: name
        }
      };
    });
  }

  onChangephone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentPatient: {
        ...prevState.currentPatient,
        phone: phone
      }
    }));
  }

  getpatients(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentPatient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatetoken(token) {
    var data = {
      id: this.state.currentPatient.id,
      name: this.state.currentPatient.name,
      phone: this.state.currentPatient.phone,
      token: this.state.currentPatient.token
    };

    TutorialDataService.update(this.state.currentPatient.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPatient: {
            ...prevState.currentPatient,
            token: token
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentPatient.id,
      this.state.currentPatient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The patient was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletepatients() {    
    TutorialDataService.delete(this.state.currentPatient.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/patients');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPatient } = this.state;

    return (
      <div>
        {currentPatient ? (
          <div className="edit-form">
            <h4>Patients</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Patient Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPatient.name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentPatient.phone}
                  onChange={this.onChangephone}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Token:</strong>
                </label>
                {currentPatient.token ? "Token" : "T-001"}
              </div>
            </form>

            {currentPatient.token ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatetoken(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatetoken(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletepatients}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatepatients}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a patient...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Tutorial);