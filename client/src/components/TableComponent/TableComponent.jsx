import { Table } from "antd"
import Loading from "../LoadingComponent/LoadingComponent";


const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isPending = false, columns = [] } = props

    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         render: text => <a>{text}</a>,
    //     },
    //     {
    //         title: 'Price',
    //         dataIndex: 'price',
    //     },
    //     {
    //         title: 'Rating',
    //         dataIndex: 'rating',
    //     },
    //     {
    //         title: 'Type',
    //         dataIndex: 'type',
    //     },
    //     {
    //         title: 'Action',
    //         dataIndex: 'action',
    //         render: text => <a>{text}</a>,
    //     },
    // ];
    // const data = products?.length && products?.map((product) => {
    //     return { ...product, key: product._id }
    // })
    // console.log("data", data)

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    console.log('data', data)
    return (
        <Loading isPending={isPending}>
            <Table
                rowSelection={Object.assign({ type: selectionType }, rowSelection)}
                columns={columns}
                dataSource={data}
            />
        </Loading>
    )
}
export default TableComponent