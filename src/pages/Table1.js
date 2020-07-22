
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

const Table1 = () => {
    const [data, setData] = useState(null);
        
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await axios.post(
                    'http://49.50.173.134:6373/table/view-grid', );
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

    const item = data.map((value, i) => <tr key={i}>
            <td>{value.dailyno}</td>
            <td>{value.study_date}</td>
            <td>{value.grade}</td>
            <td>{value.original_id}</td>
        </tr>
        );
        
    const handleIdChange = (data) =>{
        setData({
            // ...data, : e.target.value
        });
        console.log(data)

    }      
    


    const addRow = (d,i)=>{
       let data = {
           i : item.length+1,
           dailno: "",
           study_date:d.study_date,
            grade:"",
            original_id:"d"
        }
        setData([...item, data]);
        console.log(item.length);
    }


    return (
        <div>
            <button onClick={addRow}>데이터 추가</button>
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
                          <td><input type="text" value={d.original_id} onChange={handleIdChange}>
                          </input></td>
                          <td>{d.dailyno}</td>
                      </tr>
                  ))}
                    {/* {item} */}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default Table1;