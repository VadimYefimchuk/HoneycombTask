import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AdminsTable from './components/AdminsTable';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Login';
import Test from './components/Test';

import "antd/dist/antd.css";

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Counter} />
        <Route path='/admin' component={AdminsTable} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/login' component={Login} />
        <Route path='/test' component={Test} />
    </Layout>
);
