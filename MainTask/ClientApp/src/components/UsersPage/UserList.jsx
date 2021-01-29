import React from 'react';
import axios from 'axios';
import { Table, Row, Col, Pagination } from 'antd';
import { EditFilled } from '@ant-design/icons'
import { changeCurrentUser, getSearchStudents } from '../Services/UserQuery'
import { openNotification } from '../Services/Notifications'

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
      sorter: true,
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      key: 'name',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      sorter: true,
      key: 'lastName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: true,
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      key: 'email',
    },
    {
      title: 'RegisteredDate',
      dataIndex: 'registeredDate',
      sorter: true,
      key: 'registeredDate',
      render: (date) => <a>{new Date(Date.parse(date)).toLocaleString()}</a>,
    },
    {
      title: 'StudyDate',
      dataIndex: 'studyDate',
      sorter: true,
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
      pageSize: 5,
      sortOrder: '',
      sortField: ''
    };
    this.onSearch = this.onSearch.bind(this);
    this.onChangeTable = this.onChangeTable.bind(this);
  }

  async componentDidMount() {
    const persons = await getSearchStudents(this.state.currentPage, this.state.pageSize);
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

  async onSearch(current, pageSize, sortOrder = null, sortField = null, value = null) {
    const fullPersons = await getSearchStudents(current, pageSize, value, sortOrder, sortField);
    this.setState({ persons: fullPersons.data });
    this.setState({ dataCount: fullPersons.count });
  }

  onChangeSearch = (value) => {
    if (value != this.state.searchData) {
      this.setState({ searchData: value });
      this.setState({ currentPage: 1 });
    }

    openNotification('info', 'SEARCH!', 'Searching!', 1.5);
    this.onSearch(this.state.currentPage, this.state.pageSize, this.state.sortOrder, this.state.sortField, value);
  }

  expandableRowContent = (data) => {
    const rowColumn = [
      {
        title: <strong>Course name</strong>,
        dataIndex: 0,
        sorter: (a, b) => a[0].localeCompare(b[0]),
        key: 0,
      },
      {
        title: <strong>Description</strong>,
        dataIndex: 1,
        sorter: (a, b) => a[1].localeCompare(b[1]),
        key: 1,
      },
      {
        title: <strong>Start date</strong>,
        dataIndex: 2,
        sorter: (a, b) => a[2].localeCompare(b[2]),
        key: 2,
        render: (date) => <a>{new Date(Date.parse(date)).toLocaleString()}</a>,
      },
    ]
    //const courseName = data[0];
    //const description = data[1];
    //const startDateLocale = new Date(Date.parse(data[2])).toLocaleString();
    return (
      <Table
      columns={rowColumn}
      dataSource={data}
      pagination={false}
      />
    )
  }

  onChangeTable = (pagination, filters, sorter, extra) => {
    openNotification('info', 'WAITING!', 'Please waiting!', 1.5);
    var sorterBy = null;
    if (sorter.order == 'ascend'){
      sorterBy = 'asc';
    }
    else if (sorter.order == 'descend'){
      sorterBy = 'desc';
    }

    var sorterByField = sorter.field != undefined ? sorter.field.charAt(0).toUpperCase() + sorter.field.slice(1) : undefined

    this.setState({ currentPage: pagination.current });
    this.setState({ pageSize: pagination.pageSize });

    this.setState({ sortOrder:  sorterBy});
    this.setState({ sortField:  sorterByField});

    this.onSearch(pagination.current, pagination.pageSize, sorterBy, sorterByField, this.state.searchData );
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
          onChange={this.onChangeTable}
          pagination={{
            position: ["topRight", "bottomRight"],
            pageSize: this.state.pageSize,
            current: this.state.currentPage,
            total: this.state.dataCount,
          }}
          columns={this.columns}
          expandable={{
            expandedRowRender: record => this.expandableRowContent(record.description),
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
