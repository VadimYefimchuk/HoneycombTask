import React from 'react';
import axios from 'axios';
import { Table, Row, Col, Pagination } from 'antd';
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
      sorter: (a, b) => a.id - b.id,
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      key: 'name',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      key: 'lastName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      key: 'email',
    },
    {
      title: 'RegisteredDate',
      dataIndex: 'registeredDate',
      sorter: (a, b) => a.registeredDate.localeCompare(b.registeredDate),
      key: 'registeredDate',
      render: (date) => <a>{new Date(Date.parse(date)).toLocaleString()}</a>,
    },
    {
      title: 'StudyDate',
      dataIndex: 'studyDate',
      sorter: (a, b) => a.studyDate.localeCompare(b.studyDate),
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
      searchData: '',
      currentUser: {},
      dataCount: 0,
      currentPage: 1,
      pageSize: 5
    };
    this.onSearch = this.onSearch.bind(this);
    this.onPagination = this.onPagination.bind(this);
  }

  async componentDidMount() {
    const persons = await getStudents(0, 5);
    this.setState({ dataCount: persons.count });
    this.setState({ persons: persons.data });
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

  async onSearch(current, pageSize, value = null) {
    if (value == '' || value == null) {
      const fullPersons = await getStudents(current, pageSize);
      this.setState({ persons: fullPersons.data });
      this.setState({ dataCount: fullPersons.count });
    }
    else {
      const personIsSearch = await getSearchStudents(value, current, pageSize);
      if (personIsSearch != null) {
        this.setState({ persons: personIsSearch.data });
        this.setState({ dataCount: personIsSearch.count });
      }
    }

  }

  onChangeSearch = (value) => {

    if (value != this.state.searchData) {
      this.setState({ searchData: value });
      this.setState({ currentPage: 1 });
    }

    if (value == '' || value == null) {
      this.onSearch(0, this.state.pageSize, value);
    }
    else {
      if (value != this.state.searchData) {
        this.onSearch(0, this.state.pageSize, value);
      }
      else {
        this.onSearch((this.state.currentPage-1)*this.state.pageSize, this.state.pageSize, value);
      }

    }

  }

  expandableRowContent = (data) => {
    const courseName = data[0];
    const description = data[1];
    const startDateLocale = new Date(Date.parse(data[2])).toLocaleString();
    return (
      <Row>
        <Col span={2}>Course name: </Col>
        <Col span={4}><strong>{courseName}</strong></Col>
        <Col span={2}>Description: </Col>
        <Col span={9}><strong>{description}</strong></Col>
        <Col span={2}>Start date: </Col>
        <Col span={5}><strong>{startDateLocale}</strong></Col>
      </Row>
    )
  }

  async onPagination(current, pageSize) {
    const checkPoint = pageSize * (current - 1);
    
    this.setState({ currentPage: current });
    this.setState({ pageSize: pageSize });

    this.onSearch(checkPoint, pageSize, this.state.searchData);
  }

  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onChangeSearch}
        />
        <br /><br />
        <Table
          pagination={{
            position: ["topRight", "bottomRight"],
            defaultPageSize: this.state.pageSize,
            defaultCurrent: this.state.currentPage,
            total: this.state.dataCount,
            onChange: this.onPagination
          }}
          columns={this.columns}
          expandable={{
            expandedRowRender: record => record.description.map(desc => (this.expandableRowContent(desc))),
            rowExpandable: record => record.description.length !== 0,
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
