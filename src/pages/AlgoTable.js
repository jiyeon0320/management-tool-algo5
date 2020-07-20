import React, {useEffect, useState, createContext, useRef, useContext} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { requestViewGrid } from '../actions';
import {Table, Input, Button, Form, DatePicker, Select} from 'antd';
import styled from '@emotion/styled';
import axios from 'axios';
import moment from 'moment';

const {Option} = Select;
//셀 입력
const EditableContext = createContext();
const dateFormat = 'YYYY-MM-DD';

const EditableRow = ({index, ...props}) =>{
    const [form] = Form.useForm();
    return(
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}

const EditableCell = ({
    DatePicker,
    title, 
    editable,
    children,
    dataIndex,
    record,
    handleSubmit,
    ...restProps
}) =>{
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form =useContext(EditableContext);
    useEffect(() =>{
        if (editing){
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () =>{
        setEditing(!editing);
        form.setFieldValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e =>{
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSubmit({...record, ...values});
        } catch (error) {
            console.log(error);
        }
    }

    let childNode = children;

    if(editable){
        childNode = editing?(
            <Form.Item name={dataIndex} rules={[{required: true, message:`${title} is required.`,},]}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ):(
            <div className="editable-cell-value-wrap" onClick={toggleEdit}>{children}</div>
        );
    }
    return <td {...restProps}>{childNode}</td>
};

const columns =[
    {
        title: '등록일자',
        dataIndex: 'study_date',
        key: 'dailyno',
        align: 'center',
        editable: true,
        render: (date) =>
            <DatePicker defaultValue={moment(date, dateFormat)} />   
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
];
const handleChange=(value)=>{
    console.log(value);
}
const AlgoTable = () => {
    const [data, setData] = useState(null);
        
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await axios.post(
                    'http://49.50.173.134:6373/table/view-grid', );
                    setData(response.data.data);                
                   
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    },[]);

    if(!data){
        return null;
    }

    const components = {
        body:{
            row: EditableRow,
            cell: EditableCell,
        },
    };
    

    //변경된 데이터 저장
    // const handleSave = row =>{
    //     const newData = [...data.data];
    //     const index = newData.findIndex(item => data.data.dailyno === item.key);
    //     const item = newData[index];
    // }

    //데이터 추가 버튼 클릭
    const handleAdd =() =>{
    console.log(data.length);

        const newData ={
            key: data.length+1,
            dailyno: "",
            study_date: "",
            grade: "",
            original_id: "dd",
        }
        setData(...data, newData);

    }
   
    //변경사항 저장 버튼 클릭
    const handleSubmit =() =>{

    }


  
        return (
            <div>
                <Button onClick={handleAdd} type="primary">데이터 추가</Button>
                <StyledTable
                    columns={columns}
                    dataSource={data}
                    bordered
                    components={components}
                    >
                </StyledTable>
                <Button onClick={handleSubmit} type="primary">변경사항 저장</Button>
            </div>
        );
    };


 /* styling */   
const StyledTable = styled(Table)`
padding: 50px 50px;
`;
    export default AlgoTable;