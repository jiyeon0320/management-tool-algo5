/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useEffect,
  useState,
  createContext,
  useRef,
  useContext,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Input,
  Button,
  Form,
  DatePicker,
  Select,
  Modal,
  message,
  Popconfirm,
} from 'antd';
import styled from '@emotion/styled';
import moment from 'moment';
import { requestUpdateGrid, requestViewGrid } from '../actions';

/*
## goal
- ant design에 있는 Table 사용
- add row 버튼 누르면 아래에 행이 추가 되는 기능
- 셀에 더블클릭하면 수정 가능
- 체크 박스로 여러개 선택 후 일괄 삭제 가능
- 마지막에 save 버튼 누르면 최종적으로 변경된 사항들 모두 저장

## current
- 데이터 추가 버튼 누르면 모달창으로 데이터 입력 서버 전송 가능

- 페이징대로 데이터가 출력되지 않음. (study_date, grade) render 기능을 사용한 열에 한해서 발생됨
-  

*/

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

const EditableContext = createContext();

const EditableRow = ({ index, ...props }) => {
  console.log(index);
  const [form] = Form.useForm();
  console.log(form);
  // dispatch(requestUpdateGrid({ study_date, grade, original_id, stat }));

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  dailyno,
  editing,
  dataIndex,
  title,
  inputType,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {/* {inputNode} */}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

//메인 메서드
const AlgoTable = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [study_date, setStudy_date] = useState();
  const [grade, setGrade] = useState();
  const [original_id, setOriginal_id] = useState();
  const [dailyno, setDailyno] = useState();
  const [stat, setStat] = useState();
  const viewGrid = useSelector((state) => state.viewGrid); //기존 데이터 출력
  const [data, setData] = useState(viewGrid);
  // const [editingKey, setEditingKey] = useState("");
  const dispatch = useDispatch();

  //데이터 출력하기
  useEffect(() => {
    dispatch(requestViewGrid({}), setData(viewGrid));
  }, [dispatch]);

  const dataCount = viewGrid.length;
  console.log(dataCount); //데이터 개수

  // //데이터 추가 버튼 클릭
  const showModal = () => {
    setVisible(true);
    setStat('I'); //insert
  };

  //날짜 수정하기
  const handleDate = (date, dateString) => {
    console.log(date, dateString);
    setStudy_date(dateString);
  };
  //학년 수정하기
  const handleGrade = (grade) => {
    console.log(grade.value);
    setGrade(Number(grade.value));
  };
  // 내용 수정
  const dataChange = (e) => {
    setOriginal_id(e.target.value);
  };

  //모달 ok 버튼 누르기
  const handleOk = () => {
    const insertData = [{ study_date, grade, original_id, stat }];
    if (study_date === null || grade === null || original_id === null) {
      alert('빈 칸이 있으면 안됨, 다 채우기');
    }
    dispatch(requestUpdateGrid({ study_date, grade, original_id, stat }));
    console.log({ study_date, grade, original_id, stat });
    console.log(insertData.length);
    setVisible(false);
  };

  const handleCancle = () => {
    console.log('모달 데이터 입력 취소');
    setVisible(false);
  };

  // 수정하려고 선택한 key 값=> 여기서는 dailyno 값
  const isEditing = dailyno;
  // console.log(`editing ${editingKey}`);
  //수정하기
  const handleEdit = (d) => {
    form.setFieldsValue({
      study_date: '',
      grade: '',
      original_id: '',
      stat: 'D',
      dailyno: d.target.value,
    });

    console.log(d.target.value);
    setStat('D');
    setDailyno(Number(d.target.value));
  };
  const ecancel = () => {
    setDailyno('');
  };

  // 전체 저장
  const handleSave = (row) => {
    setData({ study_date, grade, original_id, dailyno, stat, row });
    // const newData = [dataSource];
    console.log('뉴데이타', study_date, grade, original_id, dailyno, stat);

    const index = setData.findIndex((item) => row.dailyno === item.dailyno);
    console.log('인덱스' + index);
    const item = setData[index];
    setData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: setData,
    });
  };

  //삭제
  const handleDelete = (d) => {
    console.log(d.target.value);
    setStat('D');
    setDailyno(Number(d.target.value));
  };
  const confirm = () => {
    dispatch(requestUpdateGrid({ dailyno, stat }));
    console.log(`번호: ${dailyno} / 상태: ${stat}`);
    message.success('삭제 성공');
    setVisible(false);
  };
  const cancel = () => {
    message.error('삭제 취소');
    setVisible(false);
  };

  const columns = useMemo(
    () => [
      {
        title: '등록일자',
        dataIndex: 'study_date',
        align: 'center',
        editable: true,
        render: (date) => (
          <DatePicker
            defaultValue={moment(date, dateFormat)}
            format={dateFormat}
          />
        ),
      },
      {
        title: '학년',
        dataIndex: 'grade',
        align: 'center',
        editable: true,
        render: (grade) => (
          <Select
            labelInValue
            defaultValue={{ value: grade }}
            onChange={handleGrade}
          >
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
          </Select>
        ),
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
        render: (dailyno) => (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button value={dailyno} onClick={handleDelete}>
              Delete
            </button>
          </Popconfirm>
        ),
      },
    ],
    [EditableRow]
  );
  //셀 실시간 수정 되게-input
  const mergedColumns = columns.map((col) => {
    console.log(col);
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (dailyno) => ({
        dailyno,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing,
      }),
    };
  });

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        데이터 추가
      </Button>
      <Button type="primary" onClick={handleSave}>
        수정 저장
      </Button>
      <Modal
        title="데이터 입력하기"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancle}
        value="I"
        // confirmLoading={confirmLoading}
      >
        <Input.Group compact>
          <DatePicker onChange={handleDate} />
          <Select
            labelInValue
            defaultValue={{ value: grade }}
            onChange={handleGrade}
          >
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
          </Select>
          <Input placeholder="내용" value={original_id} onChange={dataChange} />
        </Input.Group>
      </Modal>
      {/* <Button onClick={handleSubmit} type="primary">변경사항 저장</Button> */}
      <StyledTable
        columns={mergedColumns}
        dataSource={viewGrid}
        bordered
        components={{
          body: {
            cell: EditableCell,
            row: EditableRow,
          },
        }}
        rowClassName={() => 'editable-row'}
        pagination={{
          onChange: true,
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
