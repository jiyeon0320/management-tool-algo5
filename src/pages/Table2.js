import React,{useState} from 'react';

const Table2 = () => {
    const [rows, setRows] = useState([]);

  const changeText = id => e => {
    const {
      target: { value }
    } = e;

    const tempRows = rows.map(row => {
      if (row.id === id + 1) {
        row["todo"] = value;
      }
      return row;
    });

    setRows(tempRows);
  };

  const addRow = () => {
    let data = {
      id: rows.length + 1,
      todo: ""
    };
    setRows([...rows, data]);
  };

  const allDeleteRow = () => {
    setRows([]);
  };

  const deleteRow = id => () => {
    let tempRows = rows.filter(row => {
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
        {rows.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>할일</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      type="text"
                      onChange={changeText(i)}
                      value={d.todo}
                    />
                  </td>
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