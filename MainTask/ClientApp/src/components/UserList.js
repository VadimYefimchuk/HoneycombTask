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
      <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>LastName</th>
          <th>Age</th>
          <th>Email</th>
          <th>RegisteredDate</th>
          <th>StudyDate</th>
        </tr>
      </thead>
      <tbody>
        {this.state.persons.map(person =>
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.lastName}</td>
            <td>{person.age}</td>
            <td>{person.email}</td>
            <td>{person.registeredDate}</td>
            <td>{person.studyDate}</td>
          </tr>
        )}
      </tbody>
    </table>
    )
  }
}