import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';



/** 2020. 08. 13. 앤트 디자인 적용한 테이블  */


const TableComponent = () => {

    const [grade, setGrade] = useState(''); //학년
    const [searchDate, setSearchDate] = useState({ from_date: new Date(), to_date: new Date()});
    const [datas, setDatas] = useState([]); //기존 전체 데이터 출력

    //서버 데이터 불러오기
    useEffect(() => {
        const fetchData = async (data,i) => {
            try {
                setLoading(true);
                const { data: viewGrid } = await axios.post(
                    'http://localhost:6373/table/view-grid',
                    {
                        from_date: searchDate.from_date,
                        to_date: searchDate.to_date,
                        grade: grade,
                    }
                );
                setSearchDate({
                    ...searchDate,
                    from_date: searchDate.from_date,
                    to_date: searchDate.to_date,
                }); //오늘 날짜});
                setGrade(viewGrid.data[0].grade)
                setDatas(viewGrid.data); //서버 데이터 담기
                setLoading(false);
            } catch (error) {
                console.log(error);
            }

        };
        fetchData();
    },[grade, searchDate.from_date, searchDate.to_date]);



    const columns =[
        {
            title: '등록일자',
            dataIndex: 'study_date',
            align: 'center',
            editable: true,
        },{
            title: '학년',
            dataIndex: 'grade',
            align: 'center',
            editable: true,
        },
        {
            title: '내용',
            dataIndex: 'original_id',
            align: 'center',
            editable: true,
        },
        {
            title: '번호',
            dataIndex: 'dailyno',
            align: 'center',
        },
        {
            title: '삭제',
            dataIndex: 'dailyno',
            align: 'center',   
        }
    ]
    return (
        <Table
            columns = {columns}
            dataSource = {viewGrid}
        />
            
        
    );
};

export default TableComponent;