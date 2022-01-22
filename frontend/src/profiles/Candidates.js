import React, { Component } from 'react'
import { getId, setId } from './Util'
import { get } from './Axios'


import Axios from "axios";
import './Cand.css';

export default class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            candidates: []
        };
        this.getCand()
    }
    getCand = async () => {
        let res = await get("http://localhost:8080/api/sequelize/candidates")
        console.log('candidates', res);
        this.setState({ candidates: res })
    }
    updateCand = () => {
        this.props.history.push({
            pathname: "/editCand",
            state: { id: this.state.id },
        });
    };


    render() {
        return (
            <div>

                <h1>Candidati</h1>

                <tbody>
                    <tr >
                        <th>Nume</th>
                        <th>Varsta</th>
                        <th>Pozitia actuala</th>

                        <th>Vechime in munca</th>

                        <th>Delete</th>
                        <th>Edit</th>

                    </tr>
                    {
                        this.state.candidates.map(candidates =>

                            <tr key={candidates.CandidateId}>
                                <td>{candidates.Name} </td>
                                <td>{candidates.Age}</td>
                                <td>{candidates.Position}</td>
                                <td>{candidates.Seniority}</td>

                                <td><button className='pulse' onClick={(e) =>
                                    Axios.delete(`http://localhost:8080/api/sequelize/candidates/${candidates.CandidateId}`)
                                        .then((res) => {
                                            alert('The candidate was succesfully deleted!')
                                            this.getCand()
                                        })

                                }>Stergere</button></td>
                                <td><button className='pulse' onClick={(e) =>
                                    this.props.history.push({
                                        pathname: "/editCand",
                                        state: { id: this.state.id, candidateId: candidates }
                                    })
                                }>Edit</button></td>



                            </tr>)
                    }

                </tbody>

            </div>
        )
    }
}
