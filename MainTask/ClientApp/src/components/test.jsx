import * as React from 'react';

export default class Test extends React.Component {
    state = {
      count: 0,
    }
  

    render() {
      return (
        <div>
          <button onClick={this.onClick}>Добавить компонент</button>
        </div>
      );
    }
  }