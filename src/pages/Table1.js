
import React,{useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { DatePicker, Modal, Button, Input, Select } from 'antd';
import moment from 'moment';
import { requestUpdateGrid } from '../actions';

const dateFormat = 'YYYY-MM-DD';
const {Option} =Select;

const Table1 = () => {
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState();
    const [study_date, setStudy_date] = useState();
    const [grade, setGrade] = useState();
    const [original_id, setOriginal_id] = useState();
    const [trim_date, setTrim_date] = useState();
    const [stat, setStat] = useState();
    const dispatch = useDispatch();
    
    useEffect(() => {

        const fetchData = async () =>{
            try {
                const response = await axios.post(
                    'http://localhost:6373/table/view-grid', );
                    setData(response.data.data);                
                    console.log(response.data.data.dailyno);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchData();
    },[]);
    
    if(!data){
        return null;
    }




   



    //     async () =>{
    //         try {
    //             console.log('api go');
    //             await axios.post(
    //                 'http://localhost:6373/table/update-grid', );
    //                 setGrade(...grade, {grade});
                   
    //         } catch (e) {
    //             console.log(e);
    //         }
        
    // }

    const showModal =()=>{
        setVisible(true);
        
    }
    const handleOk=()=>{
        // setStat('I');
        dispatch(requestUpdateGrid({study_date, grade, original_id, stat}));
        console.log(original_id, stat, grade);
    }
    const confirmLoading=()=>{

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
                // confirmLoading={confirmLoading}
                onCancel={handleCancle}
            >
                <Input.Group compact value={setStat("I")} onChange={()=>setStat("I")}>
                
                    <DatePicker />
                        <Select defaultValue="7">
                        <Option value={grade}>7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                    </Select>
                    <Input placeholder="내용" value={original_id} onChange={(e)=> setOriginal_id(e.target.value)} />
                </Input.Group>


            </Modal>
            {data.length !== 0 &&(
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
                  {data.map((d, i)=>(
                      <tr key = {i}>
                          {/* <td>{i}</td> */}
                          <td>
                              <DatePicker defaultValue={moment(d.study_date, dateFormat)}
                               format={dateFormat}>
                              </DatePicker>
                          </td>
                          <td>
                              <select>
                                  <option value={d.grade}>{d.grade}</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                              </select>
                            </td>
                          <td><input type="text" key={i} value={d.original_id} onChange={(e)=>setOriginal_id(e.target.value)}>
                          </input></td>
                          <td>{d.dailyno}</td>
                      </tr>
                  ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default Table1;