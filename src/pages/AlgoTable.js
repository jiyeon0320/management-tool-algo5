import React, {useEffect} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {Table} from 'antd';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { requestViewGrid } from '../actions';


const StyledTable = styled(Table)`
    padding: 50px 50px;
`;


const columns =[
    {
        title: '등록일자',
        dataIndex: 'start_date',
        key: 'dailyno',
        align: 'center'
    },
    {
        title: '학년',
        dataIndex: 'grade',
        align: 'center'
    },
    {
        title: '내용',
        dataIndex: 'original_id',
        align: 'center'
    },
    {
        title: '번호',
        dataIndex: 'dailyno',
        align: 'center'
    },
];

const AlgoTable = () => {
  const viewData = useSelector((state) => state.viewData);
  const dispatch = useDispatch();
    // const [items, setItems] = useState([]);
  console.log('table page : '+ viewData);
  
  useEffect(() => {
    dispatch(requestViewGrid());
  }, );
  console.log('table page 22: '+ viewData);
    

        return (
            <div>
                <StyledTable
                    columns={columns}
                    dataSource={viewData}
                    bordered
                    >
                   
                </StyledTable>
            </div>
        );
    };
    export default AlgoTable;