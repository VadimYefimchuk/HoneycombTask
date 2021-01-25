import React from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { EditFilled } from '@ant-design/icons'
import { getStudents, changeCurrentUser, getSearchStudents } from '../Services/UserQuery'

import { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, InputNumber, Popconfirm, Form, Typography, Modal, Button } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';


const { Search } = Input;

export default class PersonList extends React.Component {

  columns = [
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
      render: (date) => <a>{new Date(Date.parse(date)).toLocaleString()}</a>,
    },
    {
      title: 'StudyDate',
      dataIndex: 'studyDate',
      key: 'studyDate',
      render: (date) => <a>{new Date(Date.parse(date)).toLocaleString()}</a>,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => { this.showModal(record) }}>
            Edit
          </Typography.Link>
        )
      },
    }
  ];

  constructor() {
    super();
    this.state = {
      persons: [],
      isModalVisible: false,
      currentUser: {}
    };
    this.onSearch = this.onSearch.bind(this);
  }

  async componentDidMount() {
    const persons = await getStudents();
    this.setState({ persons });
  }

  currentUser = {};

  showModal(record) {
    this.state.persons.map(user => {
      if (user.id == record.id) {
        this.state.currentUser = user;
        this.currentUser = user;
      }
    })
    this.setState({ isModalVisible: true });
  };

  handleOk = () => {
    changeCurrentUser(this.state.currentUser);
    this.currentUser = {};
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.currentUser = {};
    this.setState({ isModalVisible: false });
  };

  async onSearch(value) {
    if (value == '') {
      const fullPersons = await getStudents();
      this.setState({ persons: fullPersons });
    }
    else {
      const personIsSearch = await getSearchStudents(value);
      this.setState({ persons: personIsSearch });
    }

  }

  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onSearch}
        />
        <br/><br/>
        <Table
          columns={this.columns}
          expandable={{
            expandedRowRender: record => record.description.map(desc => (<p style={{ margin: 0 }}>{desc}</p>)),
            rowExpandable: record => record.description[0] !== undefined,
          }}
          dataSource={this.state.persons}
        />
        <Modal title="Change current user" visible={this.state.isModalVisible}
          width="30%" onOk={this.handleOk} onCancel={this.handleCancel}>

          <Input type="text" value={this.state.currentUser.name} size="large" placeholder="Name" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.name = event.target.value;
              this.setState({ currentUser: this.currentUser });
            }} />
          <br /><br />
          <Input type="text" value={this.state.currentUser.lastName} size="large" placeholder="LastName" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.lastName = event.target.value;
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />
          <Input type="number" value={this.state.currentUser.age} size="large" placeholder="Age" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.age = parseInt(event.target.value);
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />
          <Input type="datetime-local" value={this.state.currentUser.registeredDate} size="large" placeholder="RegisteredDate" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.registeredDate = event.target.value;
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />
          <Input type="datetime-local" value={this.state.currentUser.studyDate} size="large" placeholder="StudyDate" prefix={<UserOutlined />}
            onChange={(event) => {
              this.currentUser.studyDate = event.target.value;
              this.setState({ currentUser: this.currentUser })
            }} />
          <br /><br />

        </Modal>
      </div>
    )
  }
}
