import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://localhost:44339/api/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      //<ul>
      //  { this.state.persons.map(person => <li key={person.id}>{person.email}</li>)}
      //</ul>
      <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {this.state.persons.map(person =>
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.age}</td>
            <td>{person.email}</td>
            <td>{person.password}</td>
          </tr>
        )}
      </tbody>
    </table>
    )
  }
}