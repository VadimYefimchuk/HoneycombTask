import React from 'react';
import axios from 'axios';
import { Table} from 'antd';


const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'RegisteredDate',
    dataIndex: 'registeredDate',
    key: 'registeredDate',
  },
  {
    title: 'StudyDate',
    dataIndex: 'studyDate',
    key: 'studyDate',
  },
];


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
      <Table
      dataSource={this.state.persons} 
      columns={columns}
      />
    )
  }
}
