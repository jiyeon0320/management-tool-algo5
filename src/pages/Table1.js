
import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { DatePicker, Modal, Button, Input, Popconfirm, message } from 'antd';
import moment from 'moment';
import { requestUpdateGrid, requestViewGrid } from '../actions';

const dateFormat = 'YYYY-MM-DD';
let listCount = 0;

const Table1 = () => {
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [study_date, setStudy_date] = useState();
    const [grade, setGrade] = useState();
    const [original_id, setOriginal_id] = useState();
    const [dailyno, setDailyno] = useState();
    const [stat, setStat] = useState();
    const viewGrid = useSelector((state) => state.viewGrid);    //데이터 출력

    const dispatch = useDispatch();
    console.log(viewGrid);

    //데이터 불러오기
    useEffect(()=>{
        dispatch(requestViewGrid({}));
    },[dispatch]);

 
    const showModal =()=>{
        setVisible(true);
        setStat("I");   //insert
    }
    
    const confirmLoading=()=>{

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
    //데이터 삭제
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

    const chkClick =(e) =>{
        setDailyno(e.target.value);
        setStudy_date(e.target.value);
        setOriginal_id(e.target.value);
        setGrade(e.target.value);
        // setStat();
        console.log({study_date, grade, original_id, dailyno});
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
        listCount++;
    }

    const handleCancle=()=>{
        console.log('모달 데이터 입력 취소');
        setVisible(false);
    }
        
    
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


            {viewGrid.length !== 0 &&(
            <table>
                <thead>
                    <tr>
                        <th>등록일자</th>
                        <th>학년</th>
                        <th>내용</th>
                        <th>번호</th>
                    </tr>
                </thead>
                <tbody>
                  {viewGrid.map((d, i)=>(
                      <tr key = {i}>
                          {/* <td>{i}</td> */}
                          <td><input type="checkbox" value={d.dailyno} onClick={chkClick}/></td>
                          <td>
                              <DatePicker defaultValue={moment(d.study_date, dateFormat)} onChange={handleDate}>
                              </DatePicker>
                          </td>
                          <td>
                    <select value={d.grade} onChange={handleGrade}>
                        {/* <option value={d.grade}>{d.grade}</option>   */}
                        <option value="7">7</option>  
                        <option value="8">8</option>  
                        <option value="9">9</option>  
                    </select>
                            </td>
                          <td><input type="text" key={i} value={d.original_id} onChange={(e)=>setOriginal_id(e.target.value)}>
                          </input></td>
                          <td>{d.dailyno}</td>
                          <td><Popconfirm
                            title="삭제할것임?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          ><button value={d.dailyno} onClick={handleDelete}>삭제</button></Popconfirm></td>
                      </tr>
                  ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default Table1;