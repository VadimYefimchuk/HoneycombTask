import * as React from 'react';
import { connect } from 'react-redux';

import { DatePicker, Space } from 'antd';
import { TimePicker } from 'antd';

function onChange(date, dateString) {
  console.log(dateString);
}

function onTest(date, dateString) {
  console.log(dateString+"TEST");
}


const Test = () => (
  <div>
    <h1>TEST</h1>
    <Space direction="horizontal">
      <DatePicker onChange={onChange} />
      <TimePicker onChange={onTest} />
    </Space>  
    
  </div>
);

export default connect()(Test);