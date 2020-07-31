import React, { useState } from 'react';
import { Button, Input, Select, DatePicker, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { requestUpdateGrid } from '../actions';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

/** 입력 */

const AddModal = () => {
    // console.log(props);
    const [visible, setVisible] = useState(false);
    const [stat, setStat] = useState('I');
    const [study_date, setStudy_date] = useState('');
    const [grade, setGrade] = useState('');
    const [original_id, setOriginal_id] = useState('');
    const dispatch = useDispatch();

    //데이터 추가 버튼 클릭 -> 모달 창 오픈
    const showModal = () => {
        setVisible(true);
    };

    //날짜
    const handleDate = (e, dateString) => {
        console.log(dateString);
        setStudy_date(dateString);
    };

    //학년
    const handleGrade = (e) => {
        setGrade(e.value);
    };

    //내용
    const handleId = (e) => {
        setOriginal_id(e.target.value);
    };

    //저장 버튼 클릭!
    const handleOk = () => {
        console.log('ok');
        if (study_date === '' || grade === '' || original_id === '') {
            alert('빈 칸이 있으면 안됨, 다 채우기');
            return;
        }
        dispatch(requestUpdateGrid({ study_date, grade, original_id, stat }));
        setVisible(false);
    };

    //데이터 입력 취소
    const handleCancel = () => {
        console.log('cancel');
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                데이터 추가
            </Button>
            <Modal
                title="데이터 입력하기"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                value="I"
            >
                <Input.Group compact>
                    <DatePicker format={dateFormat} name={study_date} onChange={handleDate} />
                    <Select
                        name={grade}
                        labelInValue
                        defaultValue={{ value: '학년' }}
                        onChange={handleGrade}
                    >
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                    </Select>
                    <Input placeholder="내용" name={original_id} onChange={handleId} />
                </Input.Group>
            </Modal>
        </div>
    );
};

export default AddModal;
