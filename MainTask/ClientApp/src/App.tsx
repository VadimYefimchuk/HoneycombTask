import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AdminsTable from './components/AdminsTable';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Test from './components/Test';

import "antd/dist/antd.css";

import './custom.css'

export default () => (
    <Layout >
        <Route exact path='/login' component={Login} />
        <Route path='/admin' component={AdminsTable} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/counter' component={Counter} />
        <Route path='/register' component={Registration} />
        <Route path='/test' component={Test} />
    </Layout>
);
