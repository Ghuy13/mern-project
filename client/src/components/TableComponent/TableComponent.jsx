import { Dropdown, Space, Table } from "antd"
import Loading from "../LoadingComponent/LoadingComponent";
import { DownOutlined } from '@ant-design/icons';
import { useState } from "react";

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isPending = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: record => ({
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }
    const items = [
        {
            label: 'Xóa tất cả',
            key: 'deleteAll',
            onClick: handleDeleteAll
        }
    ];
    return (
        <Loading isPending={isPending}>
            {rowSelectedKeys.length > 0 && (
                <div >
                    <Dropdown menu={{ items }}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>

                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            )}

            <Table
                rowSelection={Object.assign({ type: selectionType }, rowSelection)}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </Loading>
    )
}
export default TableComponent