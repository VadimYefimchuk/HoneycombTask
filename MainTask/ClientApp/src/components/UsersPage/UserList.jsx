import React from 'react';
import axios from 'axios';
import {Table} from 'antd';
import {EditFilled} from '@ant-design/icons'
import {getStudents} from '../Services/UserQuery'


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
  
  constructor(){
    super();
    this.state = {
      persons: []
    }
  }

  async componentDidMount(){
    var res = await getStudents();
    var persons = getStudents().data;
    this.setState({ persons });
  }

  render() {
    const loading = this.state;
    return (
      <Table
      loading={loading}
      dataSource={this.state.persons} 
      columns={columns}
      />
    )
  }
}
