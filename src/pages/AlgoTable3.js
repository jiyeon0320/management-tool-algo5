/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState, createContext, useRef, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, Input, Button, Form, DatePicker, Select, Modal, message, InputNumber, Popconfirm, Pagination} from 'antd';
import styled from '@emotion/styled';
import moment from 'moment';
import { requestUpdateGrid, requestViewGrid } from '../actions';

//****** edit 셀을 더블클릭하면 되게 한다.  */

/*
## goal
- ant design에 있는 Table 사용
- add row 버튼 누르면 아래에 행이 추가 되는 기능
- 셀에 더블클릭하면 수정 가능
- 체크 박스로 여러개 선택 후 일괄 삭제 가능
- 마지막에 save 버튼 누르면 최종적으로 변경된 사항들 모두 저장

## current
- 데이터 추가 버튼 누르면 모달창으로 데이터 입력 서버 전송 가능

- 페이징대로 데이터가 출력되지 않음. (study_date, grade) render 기능을 사용한 열에 한해서 발생됨
-  

*/



const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';


const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  dailyno,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: dailyno[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...dailyno, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

//메인 메서드
const AlgoTable = () => {
  const [form] = Form.useForm(); 
  const [visible, setVisible] = useState(false);
  const [study_date, setStudy_date] = useState();
  const [grade, setGrade] = useState();
  const [original_id, setOriginal_id] = useState();
  const [dailyno, setDailyno] = useState();
  const [stat, setStat] = useState();
  const viewGrid = useSelector((state) => state.viewGrid);    //기존 데이터 출력
  const [data, setData] = useState(viewGrid);
  // const [editingKey, setEditingKey] = useState("");
  const dispatch = useDispatch();
   

   //데이터 출력하기
   useEffect(()=>{
       dispatch(requestViewGrid({}), setData(viewGrid));
   },[dispatch]);
   
   const dataCount = viewGrid.length;
   console.log(dataCount);    //데이터 개수
   
    // //데이터 추가 버튼 클릭
    const showModal =()=>{
      setVisible(true);
      setStat("I");   //insert
  }
    
  //날짜 수정하기
  const handleDate =(date, dateString)=>{
    console.log(date, dateString);
    setStudy_date(dateString);
}
//학년 수정하기
const handleGrade=(grade)=>{
    setGrade(Number(grade.target.value));
}
// 내용 수정
const dataChange =(e)=>{
  setOriginal_id(e.target.value);
}


  
//모달 ok 버튼 누르기
const handleOk=()=>{
  const insertData=[{study_date, grade, original_id, stat}];
  if(study_date === null || grade === null || original_id === null){
      alert('빈 칸이 있으면 안됨, 다 채우기');
  }
  dispatch(requestUpdateGrid({study_date, grade, original_id, stat}));
  console.log({study_date, grade, original_id, stat});
  console.log(insertData.length);
  setVisible(false);
}

const handleCancle=()=>{
  console.log('모달 데이터 입력 취소');
  setVisible(false);
}



// 수정하려고 선택한 key 값=> 여기서는 dailyno 값
const isEditing = dailyno;
// console.log(`editing ${editingKey}`);
//수정하기
const handleEdit = d => {
  form.setFieldsValue({
    study_date: '',
    grade: '',
    original_id: '',
    stat: 'D',
    dailyno:d.target.value,
  });

  console.log(d.target.value);
  setStat("D");
  setDailyno(Number(d.target.value));
};
const ecancel =()=>{
  setDailyno('');
}
const onEditSave = async dailyno =>{
  try {
    const row = await form.validateFields();
    const newData = [...data];
    const index = newData.findIndex(item => dailyno === item.dailyno);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setData(newData);
      setDailyno('');
    } else {
      newData.push(row);
      setData(newData);
      setDailyno('');
    }
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  } 
}








    //삭제
    const handleDelete =(d) =>{
        console.log(d.target.value);
        setStat("D");
        setDailyno(Number(d.target.value));
    }
    const confirm=()=>{
      dispatch(requestUpdateGrid({dailyno, stat}));
      console.log(`번호: ${dailyno} / 상태: ${stat}`);
      message.success('삭제 성공');
    }
    const cancel=()=>{
      message.error('삭제 취소');
    }
  


    const columns =[
      {
          title: '등록일자',
          dataIndex: 'study_date',
          align: 'center',
          editable: true,
      },
      {
          title: '학년',
          dataIndex: 'grade',
          align: 'center',
          editable: true,
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
          title: '수정',
          dataIndex: 'dailyno',
          align: 'center',           
      },
      {
          title: '삭제',
          dataIndex: 'dailyno',
          align: 'center',
          render: (dailyno)=> 
            <Popconfirm title="Sure to delete?" 
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            <button value={dailyno} onClick={handleDelete}>Delete</button>
          </Popconfirm>
      },
      
  ];

 
        return (
            <div>
                <Button type="primary" onClick={showModal}>데이터 추가</Button>
            <Modal
                title="데이터 입력하기"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancle}
                value="I"
                // confirmLoading={confirmLoading}
            >
                <Input.Group compact>
                    <DatePicker onChange={handleDate}/>
                    <select onChange={handleGrade}>
                        <option value="">학년</option>  
                        <option value="7">7</option>  
                        <option value="8">8</option>  
                        <option value="9">9</option>  
                    </select>
                    <Input placeholder="내용" value={original_id} onChange={dataChange} />
                </Input.Group>
            </Modal>
                {/* <Button onClick={handleSubmit} type="primary">변경사항 저장</Button> */}
                <Form form={form} component={false}>
                  <StyledTable
                      columns={columns}
                      dataSource={viewGrid}
                      bordered
                      rowClassName={() => 'editable-row'}
                      components={components}
                      pagination={{
                        onChange: ecancel
                      }}
                    />
                </Form>
            </div>
        );
    };


 /* styling */   
const StyledTable = styled(Table)`
padding: 50px 50px;
`;
export default AlgoTable;