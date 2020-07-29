import React from 'react';
import { Table } from 'antd';

const TableComponent = () => {
  return (
    <Table
      bordered
      columns={}
      dataSource={}
      components={{
        body: {
          cell: EditableCell,
          row: EditableRow,
        },
      }}
      rowClassName={() => 'editable-row'}
      pagination={{ onChange: false }}
    ></Table>
  );
};

export default TableComponent;
