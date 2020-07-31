/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, createContext, useRef, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Form, DatePicker, Select, Modal, message, Popconfirm } from 'antd';
import styled from '@emotion/styled';
import moment from 'moment';
import { requestUpdateGrid, requestViewGrid } from '../actions';
import DeletePop from '../components/DeletePop';
import AddModal from '../components/AddModal';
// import sampleData from './SampleData';
/*
## goal
- ant design에 있는 Table 사용
- add row 버튼 누르면 아래에 행이 추가 되는 기능
- 셀에 더블클릭하면 수정 가능
- 체크 박스로 여러개 선택 후 일괄 삭제 가능
- 마지막에 save 버튼 누르면 최종적으로 변경된 사항들 모두 저장
*/

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    console.log(form);
    console.log(index);
    console.log(props); //컬럼명은 children
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                {/* 데이터 내용 출력 */}
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

//메인 메서드
const AlgoTable = () => {
    const viewGrid = useSelector((state) => state.viewGrid); //기존 데이터 출력
    const [visible, setVisible] = useState(false);
    const [study_date, setStudy_date] = useState();
    const [grade, setGrade] = useState();
    const [original_id, setOriginal_id] = useState();
    const [dailyno, setDailyno] = useState();
    const [stat, setStat] = useState();
    const [data, setData] = useState(viewGrid);
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();

    //데이터 출력하기
    useEffect(() => {
        dispatch(requestViewGrid({}), setData(viewGrid));
    }, [dispatch]);

    //데이터 갯수
    const dataCount = viewGrid.length;
    console.log(dataCount);

    //날짜 입력- DatePicker 사용
    const handleDate = (date, dateString) => {
        console.log(`date: ${date}, dateString: ${dateString}`);
        setStudy_date(dateString);
    };
    //학년 입력 - selectBox 사용
    const handleGrade = (grade) => {
        console.log(grade.value);
        setGrade(Number(grade.value));
    };
    // 내용 입력
    const dataChange = (e) => {
        console.log(e.target.value);
        setOriginal_id(e.target.value);
    };

    // 수정 데이터 저장
    // 수정된 dailyno가 받아와지는 확인해봐야 함
    const handleSave = () => {
        // const newData = [columns.dataIndex];
        const newData = { study_date, original_id, dailyno, stat, grade };
        console.log('뉴데이타', newData);

        // setIndex(newData.findIndex((item) => row.dailyno === item.dailyno));
        // console.log('인덱스' + index);

        // const item = newData[index];
        // newData.splice(index, 1, { ...item, ...row });
        // setData({
        //   dataIndex: newData,
        // });

        // 서버로 보내기
        // dispatch(requestUpdateGrid({ study_date, grade, original_id, stat, dailyno }));
    };

    /********************************************************** */

    // 데이터 수정하기
    const EditableCell = ({
        dailyno, //한개의 행 정보가 object로 보여줌 {study_date: "2020-07-09T15:00:00.000Z", grade: 8, original_id: "RPMm81a020412_07102", trim_date: "2020-07-10", dailyno: 2058}
        title, //화면에 보여지는 컬럼명(등록일자, 학년, 내용..)
        editable,
        children, //각 셀 내용 (2020-07-23,,,7, adfadsfas,,,,)
        dataIndex, //각 컬럼명 (study_date, grade, original_id,,,)
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        // const inputRef = useRef();
        const form = useContext(EditableContext);

        console.log(dailyno);
        console.log(dataIndex);
        console.log(children);
        console.log(title);

        //객체가 출력됨
        // useEffect(() => {
        //     if (editing) {
        //         inputRef.current.focus();
        //     }
        // }, [editing]);

        //클릭으로 데이터 수정 가능하게 하는 기능
        const toggleEdit = (index) => {
            console.log(dataIndex);
            console.log(dailyno.dailyno);
            console.log(dailyno[dataIndex]);

            console.log(`인덱스::: ${index}`);
            setDailyno(dailyno.dailyno);
            setStat('U');
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: dailyno[dataIndex],
            });
        };

        const save = (e) => {
            try {
                setOriginal_id(e.target.value);
                toggleEdit();
                console.log('dddd;;;' + e.target.value);
                // handleDate();
                handleSave({ ...dailyno, ...dataIndex });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <div>
                    <Form.Item
                        style={{
                            margin: 0,
                        }}
                    >
                        {
                            (dataIndex = 'study_date' && (
                                <DatePicker
                                    // defaultValue={(moment(study_date), dateFormat)}
                                    format={dateFormat}
                                    onChange={handleDate}
                                    onPressEnter={save}
                                />
                            ))
                        }
                        {/* </Form.Item>
                    <Form.Item name={dataIndex.grade}> */}
                        {
                            (dataIndex = 'grade' && (
                                <Select
                                    labelInValue
                                    defaultValue={{ value: '학년' }}
                                    onPressEnter={save}
                                    onChange={handleGrade}
                                >
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                </Select>
                            ))
                        }
                        {/* </Form.Item>
                    <Form.Item name={dataIndex.original_id}> */}
                        {
                            (dataIndex = 'original_id' && (
                                <Input
                                    value={original_id}
                                    // onBlur={save}
                                    onPressEnter={save}
                                />
                            ))
                        }

                        {dataIndex === 'dailyno' && <Input value={dailyno} />}
                    </Form.Item>
                </div>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    /********************************************************** */

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
        [EditableRow, EditableCell]
    );

    //컬럼명을 맵 돌려서 확인
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (dailyno) => ({
                dailyno,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    return (
        <div>
            {/* 데이터 추가 */}
            <AddModal stat="I" />
            <Button type="primary" onClick={handleSave}>
                수정 저장
            </Button>

            <StyledTable
                columns={mergedColumns}
                dataSource={viewGrid}
                // dataSource={SampleData}
                bordered
                components={{
                    body: {
                        cell: EditableCell,
                        row: EditableRow,
                    },
                }}
                rowClassName={() => 'editable-row'}
                pagination={{
                    onChange: false,
                }}
            />
        </div>
    );
};

/* styling */

const StyledTable = styled(Table)`
    padding: 50px 50px;
`;
export default AlgoTable;
