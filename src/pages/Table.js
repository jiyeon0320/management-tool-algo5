import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { requestUpdateGrid, requestViewGrid } from '../actions';
// import DeletePop from '../components/DeletePop';
// import AddModal from '../components/AddModal';

function Editable() {
    const viewGrid = useSelector((state) => state.viewGrid); //기존 데이터 출력
    const dispatch = useDispatch();
    const [data, setData] = useState({
        study_date: '',
        grade: '',
        original_id: '',
        dailyno: '',
        stat: '',
    });
    const columns = [
        { title: '등록일자', field: 'study_date', type: 'date' },
        { title: '학년', field: 'grade', lookup: { 7: '7', 8: '8', 9: '9' } },
        { title: '내용', field: 'original_id', initialEditValue: '행 추가할 때 초기 값' },
        {
            title: '번호',
            field: 'dailyno',
            editable: 'never',
        },
    ];

    //데이터 출력하기
    useEffect(() => {
        dispatch(requestViewGrid({}));
    }, [dispatch]);
    console.log(viewGrid[1]);
    // const [data, setData] = useState([
    //     { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //     { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    // ]);

    //데이터 추가
    const onRowAdd = (e) => {
        console.log(e);
        console.log(e.study_date);
        console.log(e.grade);
        console.log(e.value);
        console.log(e.field);
        const { study_date, grade, original_id, stat } = data;
        setData(
            ...data,
            (study_date: e.study_date),
            (grade: e.grade),
            (original_id: e.original_id),
            (stat: 'I')
        );
        dispatch(requestUpdateGrid({ study_date, grade, original_id }));
    };
    //데이터 수정
    const onRowUpdate = (e) => {
        console.log(e);
    };
    //데이터 삭제
    const onRowDelete = (e) => {
        console.log(e);
    };

    // const onRowAdd = (e) => {
    //     console.log(e);
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             setData([...data, data]);
    //             resolve();
    //         }, 1000);
    //     });
    // };
    // const onRowUpdate = (e) => {
    //     console.log(e);
    // };
    // const onRowDelete = (e) => {
    //     console.log(e);
    // };

    return (
        <MaterialTable
            title="Material Table"
            columns={columns}
            data={viewGrid}
            editable={{
                onRowAdd: onRowAdd,
                onRowUpdate: onRowUpdate,
                onRowDelete: onRowDelete,
            }}
        />
    );
}
export default Editable;
