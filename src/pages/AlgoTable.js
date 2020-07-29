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

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  console.log(form);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
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
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  //데이터 출력하기
  useEffect(() => {
    dispatch(requestViewGrid({}), setData(viewGrid));
  }, [dispatch]);

  //데이터 갯수
  const dataCount = viewGrid.length;
  console.log(dataCount);

  //데이터 추가 버튼 클릭 -> 모달 창 오픈
  const showModal = () => {
    setVisible(true);
    setStat('I'); //insert
  };

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

  //모달 ok 버튼 누르기
  const handleOk = () => {
    if (study_date === null || grade === null || original_id === null) {
      alert('빈 칸이 있으면 안됨, 다 채우기');
    }
    //데이터 서버에 보내기
    dispatch(requestUpdateGrid({ study_date, grade, original_id, stat }));
    // console.log({ study_date, grade, original_id, stat });
    setVisible(false);
  };
  //모달 내 취소 버튼
  const handleCancle = () => {
    console.log('모달 데이터 입력 취소');
    setVisible(false);
  };

  // 수정 데이터 저장
  // 수정된 dailyno가 받아와지는 확인해봐야 함
  const handleSave = (row) => {
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
    dispatch(
      requestUpdateGrid({ study_date, grade, original_id, stat, dailyno })
    );
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

  /********************************************************** */

  // 데이터 수정하기
  const EditableCell = ({
    dailyno,
    title,
    editable,
    children,
    dataIndex,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    // const inputRef = useRef();
    const form = useContext(EditableContext);
    console.log(dailyno);
    console.log(dataIndex);

    //객체가 출력됨
    // useEffect(() => {
    //   if (editing) {
    //     inputRef.current.focus();
    //   }
    // }, [editing]);

    //클릭으로 데이터 수정 가능하게 하는 기능
    const toggleEdit = (index) => {
      console.log(dataIndex);
      console.log(dailyno.dailyno);

      console.log(`인덱스::: ${index}`);
      // setStudy_date(dailyno.study_date);
      // setGrade(dailyno.grade);
      // setOriginal_id(dailyno.original_id);
      setDailyno(dailyno.dailyno);
      setStat('U');
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: dailyno[dataIndex],
      });
    };

    const save = async (e) => {
      setOriginal_id();
      try {
        const values = await form.validateFields();
        console.log(values);

        toggleEdit();

        // handleSave({ ...dailyno, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
          // onChange={handleForm}
        >
          {dataIndex === 'study_date' && (
            <DatePicker
              // defaultValue={moment(study_date, dateFormat)}
              format={dateFormat}
              onChange={handleDate}
              onPressEnter={save}
            />
          )}
          {dataIndex === 'grade' && (
            <Select
              labelInValue
              defaultValue="학년"
              onPressEnter={save}
              onChange={handleGrade}
            >
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
            </Select>
          )}
          {dataIndex === 'original_id' && (
            <Input
              value={original_id}
              onPressEnter={save}
              onChange={dataChange}
            />
          )}
          {dataIndex === 'dailyno' && (
            <Input value={dailyno} onPressEnter={save} />
          )}
        </Form.Item>
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
    [EditableRow, EditableCell]
  );
  //수정된 컬럼명을 맵 돌려서 확인
  const mergedColumns = columns.map((col) => {
    // console.log(col);
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
