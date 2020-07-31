import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import DeletePop from './DeletePop';
import { requestViewGrid } from '../actions';

const TableComponent = () => {
    const viewGrid = useSelector((state) => state.viewGrid); //기존 데이터 출력
    const columns = useMemo(
        () => [
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
                render: (dailyno) => <DeletePop dailyno={dailyno} />,
            },
        ],
        []
    );
    return (
        <Table
            bordered
            columns={columns}
            dataSource={viewGrid}
            pagination={{ onChange: false }}
        ></Table>
    );
};

export default TableComponent;
