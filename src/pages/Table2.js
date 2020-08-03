import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { requestUpdateGrid, requestViewGrid } from '../actions';

const Table2 = () => {
    const viewGrid = useSelector((state) => state.viewGrid);
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [input, setInputs] = useState({
        study_date: '',
        grade: '',
        original_id: '',
        dailyno: '',
    });

    //데이터 불러오기
    useEffect(() => {
        dispatch(requestViewGrid());
    }, []);

    //데이터 수정(id는 키 값)
    const changeText = (id) => (e) => {
        console.log(id);
        const {
            target: { original_id },
        } = e;

        const tempRows = viewGrid.map((row) => {
            if (row.id === id + 1) {
                row['original_id'] = original_id;
            }
            return row;
        });

        setRows(tempRows);
    };
    //데이터 수정하기 위해 클릭하면 input 활성화
    const clickInput = (e) => {
        setToggle(true);
        console.log(e.target); //type , value
        const { name, value } = e.target;
        // console.log(`[${name}] : ${value}`);
        // setInputs({
        //   ...input,
        //   [name]: value,
        // });
    };

    const addRow = () => {
        let data = {
            id: rows.length + 1,
            todo: '',
        };
        setRows([...rows, data]);
    };

    const allDeleteRow = () => {
        setRows([]);
    };

    const deleteRow = (id) => () => {
        let tempRows = rows.filter((row) => {
            return row.id !== id + 1;
        });

        setRows(tempRows);
    };

    const display = () => {
        console.log(rows);
    };
    return (
        <div>
            <h3>Table Add & Delete</h3>
            <div>
                {viewGrid.length !== 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>순번</th>
                                <th>등록일자</th>
                                <th>학년</th>
                                <th>내용</th>
                                <th>번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewGrid.map((d, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    {toggle ? (
                                        <td key={i}>
                                            <input
                                                type="text"
                                                name="study_date"
                                                onChange={changeText(d)}
                                                value={d.study_date}
                                            />
                                        </td>
                                    ) : (
                                        <td
                                            name="study_date"
                                            value={d.study_date}
                                            onClick={clickInput}
                                        >
                                            {d.study_date}
                                        </td>
                                    )}
                                    <td>
                                        <input
                                            type="text"
                                            name="grade"
                                            onChange={changeText(d)}
                                            value={d.grade}
                                            onClick={clickInput}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="original_id"
                                            value={d.original_id}
                                            onChange={changeText(d.original_id)}
                                            onClick={clickInput}
                                        />
                                    </td>
                                    <td>{d.dailyno}</td>

                                    <td>
                                        <button onClick={deleteRow(i)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <button onClick={addRow}>추가</button>
            <button onClick={allDeleteRow}>초기화</button>
        </div>
    );
};

export default Table2;
