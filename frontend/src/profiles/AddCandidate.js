
import axios from "axios";
import React, { } from 'react'
import './AddCandidate.css'


export default class AddCandidate extends React.Component {
    state = {
        candidates: [],
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const country = {
            Name: this.state.Name,
            Age: this.state.Age,
            Position: this.state.Position,
            Seniority: this.state.Seniority,
        };

        axios.post(`http://localhost:8080/api/sequelize/candidates`, this.state)
            .then(res => {
                console.log(this.state);
                console.log(res);
                console.log(res.data);
                console.log("ok");
                console.log(country);
            })
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <label>
                        <br ></br>
                        Nume candidat:
                        <input type="text" name="Name" onChange={this.handleChange} />
                    </label>

                    <label>
                        <br></br>
                        Varsta Candidat:
                        <input type="text" name="Age" onChange={this.handleChange} />
                    </label>

                    <label>
                        <br></br>
                        Locul de munca:
                        <input type="text" name="Position" onChange={this.handleChange} />
                    </label>
                    <label>
                        <br></br>
                        Vechime in munca:
                        <input type="text" name="Seniority" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}