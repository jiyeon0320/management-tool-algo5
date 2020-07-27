/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState, createContext, useRef, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, Input, Button, Form, DatePicker, Select, Pagination} from 'antd';
import styled from '@emotion/styled';
import moment from 'moment';
import { requestViewGrid } from '../actions';

const {Option} = Select;

//셀 입력
// const EditableContext = createContext();
const dateFormat = 'YYYY-MM-DD';


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };



const columns =[
    {
        title: '등록일자',
        dataIndex: 'study_date',
        align: 'center',
        editable: true,
        render: (date) =>
            <DatePicker defaultValue={moment(date, dateFormat)} format={dateFormat} />   
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
        dataIndex: 'original_id',
        align: 'center',
        editable: true
    },
    {
        title: '번호',
        dataIndex: 'dailyno',
        align: 'center'
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </a>
          );
        },
      },
];
const isEditing = record => record.key === editingKey;
const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

const handleChange=(value)=>{
    console.log(value);
}


//메인 메서드
const AlgoTable = () => {
   const [data, setData] = useState(null);
   const [visible, setVisible] = useState(false);
   const [study_date, setStudy_date] = useState();
   const [grade, setGrade] = useState();
   const [original_id, setOriginal_id] = useState();
   const [dailyno, setDailyno] = useState();
   const [stat, setStat] = useState();
   const [editingKey, setEditingKey] = useState('');
   const viewGrid = useSelector((state) => state.viewGrid);    //기존 데이터 출력
   const dispatch = useDispatch();
   
   //데이터 출력하기
   useEffect(()=>{
       dispatch(requestViewGrid({}), setData(viewGrid));
   },[dispatch]);
   
   const dataCount = viewGrid.length;
   console.log(dataCount);    //데이터 개수

   const edit = record =>{
       form.setFieldsValue({
        study_date: '',
        grade:'',
        original_id:''
       });
       setDailyno(e.target.value);
       setEditingKey(record.key);
   }




   
    // //데이터 추가 버튼 클릭
    const handleAdd =() =>{
       
    // const newData ={
    //     key: data.length+1,
    //     dailyno: "",
    //     study_date: "",
    //     grade: "",
    //     original_id: "dd",
    // }
    
       
    }
    
   
    //변경사항 저장 버튼 클릭
    const handleSubmit =(e) =>{
       console.log('저장');
    }
    // const onSelectChange = (selectedRowKeys)=>{
    //     console.log('selectedRowKeys changed: ' + selectedRowKeys);
    //     set
    // }
    // const rowSelection = () =>{
    //     selectedRowKeys,
        // onChange: onSelectChange
    // }

    //페이징
    const cancel = () => {
        setEditingKey('');
      };
  
        return (
            <div>
                <Button onClick={handleAdd} type="primary">데이터 추가</Button>
                <Button onClick={handleSubmit} type="primary">변경사항 저장</Button>
                <StyledTable
                    columns={mergedColumns}
                    dataSource={viewGrid}
                    bordered
                    components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                    pagination={{
                        onChange: cancel
                      }}
                />
            </div>
        );
    };


 /* styling */   
const StyledTable = styled(Table)`
padding: 50px 50px;
`;
export default AlgoTable;