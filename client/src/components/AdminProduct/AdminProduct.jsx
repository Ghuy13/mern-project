import { Button, Form, Modal } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { WrapperHeader, WrapperUploadFile } from "./style"
import TableComponent from "../TableComponent/TableComponent"
import { useEffect, useState } from "react"
import InputComponent from "../InputCompnent/InputCompnent"
import { getBase64 } from "../../untils"
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from "../../hooks/useMutationHook"
import Loading from "../../components/LoadingComponent/LoadingComponent"
import * as message from '../../components/Message/Message';
import { useQuery } from "@tanstack/react-query"
import DrawerComponent from "../DrawerComponent/DrawerComponent"
import { useSelector } from "react-redux"



const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [fileList, setFileList] = useState([])
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const user = useSelector((state) => state?.user)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image: '',
    })
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image: '',
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
            countInStock: countInStock
        } = data;
        const res = ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock
        });
        return res
    });

    // const mutationUpdate = useMutationHooks((data) => {
    //     console.log('data', data)
    //     const {
    //         id,
    //         token,
    //         ...rests } = data;
    //     const res = ProductService.updateProduct({
    //         id,
    //         token,
    //         rests
    //     });
    //     return res
    // });
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        return ProductService.updateProduct(id, token, rests);
    });

    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct()
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
                rating: res?.data.rating,
                image: res?.data.image,
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
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])

    console.log('stateProduct', stateProductDetails)

    const handleDetailsProduct = () => {
        if (rowSelected) {
            setIsPendingUpdate(true)
            fetchGetDetailsProduct(rowSelected)

        }
        setIsOpenDrawer(true)
    }

    const { data, isPending, isSuccess, isError } = mutation
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    console.log('dataUpdated', dataUpdated)

    const { isPending: isPendingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct
    })
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'blue', fontSize: '20px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
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
        ? products.data.map(product => ({ ...product, key: product._id }))
        : []


    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            // handleCancel()
            handleCloseDrawer()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, data, isError])

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated, dataUpdated, isErrorUpdated])

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
        mutation.mutate(stateProduct)
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

    // const onUpdateProduct = async () => {
    //     mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, stateProductDetails })
    // }
    const onUpdateProduct = async () => {
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            ...stateProductDetails
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
                <TableComponent columns={columns} isPending={isPendingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }, // click row
                    };
                }} />
            </div>

            <Modal
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
                            <InputComponent value={stateProduct.type} onChange={handleOnChange} name='type' />
                        </Form.Item>

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
            </Modal>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='40%'>
                <Loading isPending={isPendingUpdate} delay={0}>
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
        </div>
    )
}

export default AdminProduct
