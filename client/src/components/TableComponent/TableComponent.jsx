import { Dropdown, Space, Table } from "antd"
import Loading from "../LoadingComponent/LoadingComponent";
import { DownOutlined } from '@ant-design/icons';
import { useMemo, useState } from "react";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], isPending = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const newColumnsExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

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

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnsExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };
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
            <button onClick={exportExcel}> Export EXcel </button>
            <Table
                rowSelection={Object.assign({ type: selectionType }, rowSelection)}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}
export default TableComponent