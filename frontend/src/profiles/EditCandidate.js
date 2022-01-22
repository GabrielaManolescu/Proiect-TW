import React, { Component } from 'react'
import { getId, setId } from './Util'
import Axios from "axios"

export default class EditCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            candNew: {
                name: '',
                age: '',
                position: '',
                seniority: ''
            }
        };
        this.state.id = this.props.location.state.id;
        this.state.candidates = this.props.location.state.candidates;
        console.log(this.state.id, this.state.candidates)
    }
    updateCand = async () => {

        Axios.push(`http://localhost:8080/api/sequelize/candidates/${this.state.candidates.id}`, JSON.stringify(this.state.candNew),
            {
                headers: { "Content-Type": "application/json" }
            }
        ).then((res) => {
            alert('Candidate Updated')
            this.props.history.push(`/candidates`)
        })
            .catch(error => {
                if (error.response !== undefined) {
                    alert(error.response.data.message)
                } else {
                    alert('eroare')
                }
            }
            );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.updateCand()
    };

    handleChange = (e) => {
        e.preventDefault();
        let newCand = this.state.candidates;
        console.log(e.target.name, e.target.value, newCand);
        newCand[e.target.name] = e.target.value;
        this.setState({ newCand: newCand });
    }; e
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <label>
                        <br ></br>
                        Nume candidat:
                        <input type="text" name="Name" value={this.state.candidates.name} onChange={this.handleChange} />
                    </label>

                    <label>
                        <br></br>
                        Varsta Candidat:
                        <input type="text" name="Age" value={this.state.candidates.age} onChange={this.handleChange} />
                    </label>

                    <label>
                        <br></br>
                        Locul de munca:
                        <input type="text" name="Position" value={this.state.candidates.position} onChange={this.handleChange} />
                    </label>
                    <label>
                        <br></br>
                        Vechime in munca:
                        <input type="text" name="Seniority" value={this.state.candidates.seniority} onChange={this.handleChange} />
                    </label>
                    <button className="pulse" type="submit">Update</button>
                </form>
            </div>
        )
    }
}