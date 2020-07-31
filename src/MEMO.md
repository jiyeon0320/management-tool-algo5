# components > AddModal.js

```
//Ant Design 쓴 상태

const AddModal = (props) => {
    ...
    // props를 한꺼번에 담고 싶어서 input 상태로 만들었음
    const [inputs, setInputs] = useState({
        stat: props.stat,
        study_date: props.study_date,
        grade: props.grade,
        original_id: props.original_id,
    });
    <br/>
    ...
    <br/>

    // onChange는 다 같은 상태값 변화 이벤트니까 한 곳에서 관리하고 싶었음
    const onChange =(e, dateString)=>{
        //같은 인풋 상태이면 아랫줄이 가능한데 각각 value값 추출법이 달라서 안됨.
         // const { name, value } = e.target;

        //그럴 경우, 이렇게 각 다르레 넣으면 될거 같았는데 안됨. 추출법이 다른 상태값들은 다 따로 이벤트 처리 해야하는지?
        setInputs({
            ...inputs,
            stat: 'I',
            study_date: dateString,
            grade: e.value,
            original_id: e.target.value,
            // [name]: value,
        });


    }


//jsx 부분
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
                        name={props.study_date}
                        onChange={handleChange}
                    />
                    <Select
                        name={props.grade}
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
                        name={props.original_id}
                        // value={original_id}
                        onChange={handleChange}
                    />
                </Input.Group>
            </Modal>
        </div>
    );





```
