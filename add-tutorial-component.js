import React,{Component} from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component{
    constructor(props){
        super(props);
        this.onChangename=this.onChangename.bind(this);
        this.onChangephone=this.onChangephone.bind(this);
        this.saveTutorial=this.saveTutorial.bind(this);
        this.newTutorial=this.newTutorial.bind(this);

        this.state={
            id:null,
            name:"",
            phone:"",
            token:"T-${id}",
        };
    }

    onChangename(e) {
        this.setState({
          name: e.target.value
        });
      }
    
      onChangephone(e) {
        this.setState({
          phone: e.target.value
        });
      }
    
      saveTutorial() {
        var data = {
          name: this.state.name,
          phone: this.state.phone
        };
    
        TutorialDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              name: response.data.name,
              phone: response.data.phone,
              token: response.data.token,
    
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      newTutorial() {
        this.setState({
          id: null,
          name: "",
          phone: "",
          token: "",
        });
      }
    
      render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newTutorial}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Patient Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangename}
                    name="name"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="phone">Phone No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    required
                    value={this.state.phone}
                    onChange={this.onChangephone}
                    name="description"
                  />
                </div>
    
                <button onClick={this.saveTutorial} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
    }
