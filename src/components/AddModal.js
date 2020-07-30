import React, { useState } from 'react';
import { Button, Input, Select, DatePicker, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { requestUpdateGrid } from '../actions';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

/** 입력 */

const AddModal = (props) => {
    console.log(props);
    const [visible, setVisible] = useState(false);
    const [stat, setStat] = useState('I');
    const [inputs, setInputs] = useState({
        study_date: '',
        grade: '',
        original_id: '',
    });
    const dispatch = useDispatch();

    //데이터 추가 버튼 클릭 -> 모달 창 오픈
    const showModal = () => {
        setVisible(true);
    };

    const handleChange = (e, dateString) => {
        console.log(e, dateString);
        // const { name, value } = e.target;
        // setInputs({
        //     ...inputs,
        //     [name]: value,
        // });
    };

    const handleOk = () => {
        console.log('ok');
        // dispatch(requestUpdateGrid({ study_date, grade, original_id, stat }));
        dispatch(requestUpdateGrid({ inputs, stat }));
        setVisible(false);
    };
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
                    <DatePicker
                        format={dateFormat}
                        name={inputs.study_date}
                        onChange={handleChange}
                    />
                    <Select
                        // name={grade}
                        labelInValue
                        defaultValue="학년"
                        onChange={handleChange}
                    >
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                    </Select>
                    <Input
                        placeholder="내용"
                        // name={original_id}
                        // value={original_id}
                        onChange={handleChange}
                    />
                </Input.Group>
            </Modal>
        </div>
    );
};

export default AddModal;
