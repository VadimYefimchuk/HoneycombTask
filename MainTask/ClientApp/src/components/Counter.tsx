import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';
import { Form, Input, Button, Checkbox } from 'antd';

import axios from 'axios';

import ReactDOM from 'react-dom';





type CounterProps =
  CounterStore.CounterState &
  typeof CounterStore.actionCreators &
  RouteComponentProps<{}>;

class Counter extends React.PureComponent<CounterProps> {
  Facebook = () => {
    const data = {
      provider: "Facebook",
      returnUrl: ""
    }
    axios.post(window.location.href.replace(window.location.pathname, "") + "/api/authenticate/facebook", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  responseFacebook = (response: any) => {
    console.log(response);
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Counter</h1>
        
        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.props.count}</strong></p>

        <button type="button"
          className="btn btn-primary btn-lg"
          onClick={() => { this.props.decrement(); }}>
          Increment
                </button>
      </React.Fragment>
    );
  }
};

export default connect(
  (state: ApplicationState) => state.counter,
  CounterStore.actionCreators
)(Counter);
