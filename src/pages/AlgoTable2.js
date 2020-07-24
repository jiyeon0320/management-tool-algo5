import React, { useContext, useState, useEffect, useRef } from 'react';
import {Table, Input, Button, Form, DatePicker, Select} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { requestViewGrid } from '../actions';
import moment from 'moment';
import axios from 'axios';

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';

  const columns =[
    {
        title: '등록일자',
        dataIndex: 'study_date',
        key: 'study_date',
        align: 'center',
        editable: true,
        render: (date) =>
            <DatePicker defaultValue={moment(date, dateFormat)} dateFormat={dateFormat} />   
    },
    {
        title: '학년',
        dataIndex: 'grade',
        align: 'center',
        editable: true,
        render: (grade)=>
            <Select labelInValue defaultValue={{value: grade}}
                onChange={handleChange}>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                </Select>
    },
    {
        title: '내용',
        key: 'original_id',
        dataIndex: 'original_id',
        align: 'center',
        editable: true
    },
    {
        title: '번호',
        key: 'dailyno',
        dataIndex: 'dailyno',
        align: 'center'
    },
];
//학년 바꾸기
const handleChange=(value)=>{
  console.log(value);
}

const AlgoTable2 =() => {
    const [data, setData] = useState(null);
    // const [count, setCount] = useState();

    useEffect(() => {
      const fetchData = async (i) =>{
        try {
          const response = await axios.post(
            'http://localhost:6373/table/view-grid', );
              
            setData(response.data.data);
            const dataNum = response.data.data.length; //데이터 개수
            console.log(dataNum);
            
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      },[]);
      
    
    return (
      <div>
        
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={columns}
        />
      </div>
    );
  
}
export default AlgoTable2;