import { Button, Form, Select, Space } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { WrapperHeader, WrapperUploadFile } from "./style"
import TableComponent from "../TableComponent/TableComponent"
import { useEffect, useRef, useState } from "react"
import InputComponent from "../InputCompnent/InputCompnent"
import { getBase64, renderOptions } from "../../untils"
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from "../../hooks/useMutationHook"
import Loading from "../../components/LoadingComponent/LoadingComponent"
import * as message from '../../components/Message/Message';
import { useQuery } from "@tanstack/react-query"
import DrawerComponent from "../DrawerComponent/DrawerComponent"
import { useSelector } from "react-redux"
import ModalComponent from "../ModalComponent/ModalComponent"



const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [fileList, setFileList] = useState([])
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [typeSelect, setTypeSelect] = useState('')
    const user = useSelector((state) => state?.user)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        newType: '',
        discount: ''
    })
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        discount: ''
    })

    const [form] = Form.useForm()
    const [formDetails] = Form.useForm();

    const mutation = useMutationHooks((data) => {
        const {
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock: countInStock,
            discount
        } = data;
        const res = ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
            discount
        });
        return res
    });


    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        return ProductService.updateProduct(id, token, { ...rests });
    });

    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data;
        return ProductService.deleteProduct(id, token);
    });

    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        return ProductService.deleteManyProduct(ids, token);
    });

    const getAllProduct = async () => {
        // Tạm thời set limit cao để lấy tất cả sản phẩm
        const res = await ProductService.getAllProduct('', 1000);
        console.log('Products response:', res);
        return res
    }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data.name,
                type: res?.data.type,
                countInStock: res?.data.countInStock,
                price: res?.data.price,
                description: res?.data.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                discount: res?.data?.discount
            })
        }
        setIsPendingUpdate(false)
    }

    useEffect(() => {
        if (isOpenDrawer) {
            formDetails.setFieldsValue(stateProductDetails)
        }
    }, [formDetails, stateProductDetails, isOpenDrawer])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsPendingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])


    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const handleDeleteManyProduct = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        return res;
    }

    const { data, isPending, isSuccess, isError } = mutation
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct
    })

    const typeProduct = useQuery({
        queryKey: ['type-product'],
        queryFn: fetchAllTypeProduct
    })

    const { isPending: isPendingProducts, data: products } = queryProduct

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'blue', fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => {
                        var _a;
                        return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
                    }, 100);
                }
            },
        },
        // render: text =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>=50',
                    value: '>=',
                },
                {
                    text: '<=50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50;
                } else if (value === '<=') {
                    return record.price <= 50;
                }

            }
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>=3',
                    value: '>=',
                },
                {
                    text: '<=3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.rating >= 3;
                } else if (value === '<=') {
                    return record.rating <= 3;
                }

            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];

    const dataTable = Array.isArray(products?.data)
        ? products?.data?.map(product => ({ ...product, key: product._id }))
        : []


    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()

        } else if (isError) {
            message.error()
        }
    }, [isSuccess, data, isError])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDeletedMany, dataDeletedMany, isErrorDeletedMany])

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated, dataUpdated, isErrorUpdated])


    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDeleted, dataDeleted, isErrorDeleted])


    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }


    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            name: '',
            type: '',
            countInStock: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            discount: ''
        })
        form.resetFields()
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateProductDetails({
            name: '',
            type: '',
            countInStock: '',
            price: '',
            description: '',
            rating: '',
            image: '',
        })
        form.resetFields()
    }

    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            discount: stateProduct.discount,
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleOnChange = (e) => {
        setStateProduct(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleOnChangeDetails = (e) => {
        setStateProductDetails(prev => ({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnchangeAvatar = async ({ fileList: newFileList }) => {
        const file = newFileList[0]
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setFileList(newFileList)

        setStateProduct(prev => ({
            ...prev,
            image: file?.preview
        }))
    }

    const handleOnchangeAvatarDetails = async ({ fileList: newFileList }) => {
        const file = newFileList[0]
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setFileList(newFileList)
        setStateProductDetails({
            ...stateProductDetails,
            image: file?.preview
        })
    }

    const onUpdateProduct = async () => {
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            ...stateProductDetails
        }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '6px',
                    borderStyle: 'dashed',
                }} onClick={() => { setIsModalOpen(true) }}>
                    <PlusOutlined style={{ fontSize: '40px' }} />
                </Button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    handleDeleteMany={handleDeleteManyProduct}
                    columns={columns}
                    isPending={isPendingProducts}
                    data={dataTable}
                    pagination={{
                        total: dataTable.length,
                        pageSize: 10
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id)
                            },
                        };
                    }}
                />
            </div>

            <ModalComponent
                forceRender
                title="Tạo sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isPending={isPending} delay={0}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                            <InputComponent value={stateProduct.name} onChange={handleOnChange} name='name' />
                        </Form.Item>

                        <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please input product type!' }]}>
                            <Select
                                name='type'
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(typeProduct?.data?.data)}
                            />
                        </Form.Item>

                        {stateProduct.type === 'add_type' && (
                            <Form.Item label="New type" name="newType" rules={[{ required: true, message: 'Please input product type!' }]}>
                                <InputComponent value={stateProduct.newType} onChange={handleOnChange} name='newType' />
                            </Form.Item>
                        )}

                        <Form.Item label="Count In Stock" name="countInStock" rules={[{ required: true, message: 'Please input stock count!' }]}>
                            <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name='countInStock' />
                        </Form.Item>

                        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
                            <InputComponent value={stateProduct.price} onChange={handleOnChange} name='price' />
                        </Form.Item>

                        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
                            <InputComponent value={stateProduct.description} onChange={handleOnChange} name='description' />
                        </Form.Item>

                        <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please input rating!' }]}>
                            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name='rating' />
                        </Form.Item>

                        <Form.Item label="Discount" name="discount" rules={[{ required: true, message: 'Please input discount!' }]}>
                            <InputComponent value={stateProduct.discount} onChange={handleOnChange} name='discount' />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList} // ✅ return đúng danh sách file
                            rules={[{ required: true, message: 'The input is required' }]}
                        >
                            <WrapperUploadFile
                                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                                onChange={handleOnchangeAvatar}
                                maxCount={1}
                                fileList={fileList}
                                listType="picture-card"
                            >
                                <Button>Select File</Button>
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
            <DrawerComponent forceRender title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='40%'>
                <Loading isPending={isPendingUpdate || isPendingUpdated} delay={0}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onUpdateProduct}
                        autoComplete="off"
                        form={formDetails}
                    >
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                            <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name='name' />
                        </Form.Item>

                        <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please input product type!' }]}>
                            <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name='type' />
                        </Form.Item>

                        <Form.Item label="Count In Stock" name="countInStock" rules={[{ required: true, message: 'Please input stock count!' }]}>
                            <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name='countInStock' />
                        </Form.Item>

                        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
                            <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name='price' />
                        </Form.Item>

                        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
                            <InputComponent value={stateProductDetails.description} onChange={handleOnChangeDetails} name='description' />
                        </Form.Item>

                        <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please input rating!' }]}>
                            <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name='rating' />
                        </Form.Item>

                        <Form.Item label="Discount" name="discount" rules={[{ required: true, message: 'Please input discount!' }]}>
                            <InputComponent value={stateProductDetails.discount} onChange={handleOnChangeDetails} name='discount' />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button>Select File</Button>
                                {stateProductDetails?.image && (
                                    <img
                                        src={stateProductDetails?.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent
                forceRender
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProduct}
            >
                <Loading isPending={isPendingDeleted} delay={0}>
                    <div>Bạn có muốn xóa sản phẩm này không ?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}
export default AdminProduct
