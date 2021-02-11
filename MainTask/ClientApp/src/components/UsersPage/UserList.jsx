import React from 'react';
import axios from 'axios';
import { Table, Row, Col, Pagination, Spin } from 'antd';
import { EditFilled } from '@ant-design/icons'
import { changeCurrentUser, getSearchStudents } from '../Services/UserQuery'
import { openNotification } from '../Services/Notifications'

import { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, InputNumber, Popconfirm, Form, Typography, Modal, Button, DatePicker } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import {areaStyle, inputStyle, buttonStyle} from '../Styles/MainFieldStyle'
import moment from 'moment';



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
      loadingTable: true,
      loading: false,
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
    this.setState({ loadingTable: false });
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
    this.onFill();
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
    this.setState({loading: false});
  }

  onChangeSearch = (value) => {
    this.setState({loading: true});
    if (value != this.state.searchData) {
      this.setState({ searchData: value });
      this.setState({ currentPage: 1 });
    }

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
        title: <strong>Start Date</strong>,
        dataIndex: 2,
        sorter: (a, b) => a[2].localeCompare(b[2]),
        key: 2,
        render: (date) => <a>{new Date(Date.parse(date)).toLocaleString()}</a>,
      },
    ]

    return (
      <Table
        columns={rowColumn}
        dataSource={data}
        pagination={false}
      />
    )
  }

  onChangeTable = (pagination, filters, sorter, extra) => {
    this.setState({loading: true});
    var sorterBy = null;
    if (sorter.order == 'ascend') {
      sorterBy = 'asc';
    }
    else if (sorter.order == 'descend') {
      sorterBy = 'desc';
    }

    var sorterByField = sorter.field != undefined ? sorter.field.charAt(0).toUpperCase() + sorter.field.slice(1) : undefined

    this.setState({ currentPage: pagination.current });
    this.setState({ pageSize: pagination.pageSize });

    this.setState({ sortOrder: sorterBy });
    this.setState({ sortField: sorterByField });

    this.onSearch(pagination.current, pagination.pageSize, sorterBy, sorterByField, this.state.searchData);
  }

  formRef = React.createRef();
  onReset = () => {
    console.log("hi");
    this.formRef.current.resetFields();
  };

  onFill = () => {
    this.formRef.current.setFieldsValue({
      name: this.state.currentUser.name,
      lastName: this.state.currentUser.lastName,
      age: this.state.currentUser.age,
      registeredDate: moment(this.state.currentUser.registeredDate, 'YYYY-MM-DD HH:mm:ss'),
    });
  };

  onSubmit = (value) => {

    this.currentUser.name = value.name;
    this.currentUser.lastName = value.lastName;
    this.currentUser.age = value.age;
    this.currentUser.registeredDate = value.registeredDate._d.toISOString();

    this.setState({ currentUser: this.currentUser });

    changeCurrentUser(this.state.currentUser);
    this.currentUser = {};
    this.setState({ isModalVisible: false });

  };

  render() {
    return (
      <div>
        <Spin spinning={this.state.loading}>
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
            loading={this.state.loadingTable}
          />
          <Modal
            footer={false}
            forceRender={true}
            title="Change current user"
            visible={this.state.isModalVisible}
            width="30%"
            onOk={this.handleOk}
            onCancel={this.handleCancel}>

            <Form

              ref={this.formRef}
              name="normal_login"
              initialValues={this.onFill}
              onFinish={this.onSubmit}

            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your LastName!',
                  },
                ]}
              >
                <Input placeholder="LastName" />
              </Form.Item>

              <Form.Item
                name="age"
                rules={[
                  {
                    type: 'number', min: 0, max: 99,
                    required: true,
                    message: 'Please input your Age!',
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Age" />
              </Form.Item>

              <Form.Item
                name="registeredDate"
                rules={[
                  {
                    type: 'object',
                    required: true,
                    message: 'Please select registeredDate time!',
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} showTime />
              </Form.Item>

              <Form.Item>
                <div style={{ textAlign: "center" }}>
                  <Button style={buttonStyle} htmlType="submit">
                    <strong>SAVE CHANGES</strong>
                  </Button >
                </div>
              </Form.Item>
            </Form>

          </Modal>
        </Spin>
      </div>
    )
  }
}
