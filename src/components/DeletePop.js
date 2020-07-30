import React, { useState } from 'react';
import { requestUpdateGrid } from '../actions';
import { useDispatch } from 'react-redux';
import { message, Popconfirm } from 'antd';

const DeletePop = (props) => {
    console.log(props);
    const [dailyno, setDailyno] = useState();
    const [stat, setStat] = useState();
    const dispatch = useDispatch();
    //삭제
    const handleDelete = (d) => {
        console.log(d.target);
        console.log(props.dailyno);
        setStat('D');
        setDailyno(props.dailyno);
    };

    const confirm = (props) => {
        dispatch(requestUpdateGrid({ dailyno, stat }));
        console.log(`번호: ${dailyno} / 상태: ${stat}`);
        // message.success('삭제 성공');
        // setVisible(false);
    };
    const cancel = () => {
        // message.error('삭제 취소');
        // setVisible(false);
    };

    return (
        <Popconfirm
            title="Sure to delete?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <button value={() => dailyno} onClick={handleDelete}>
                Delete
            </button>
        </Popconfirm>
    );
};

export default DeletePop;
