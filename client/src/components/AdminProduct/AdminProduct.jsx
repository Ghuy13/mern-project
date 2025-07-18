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


const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fileList, setFileList] = useState([])
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image: '',
    })

    const [form] = Form.useForm()

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

    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }
    const { data, isPending, isSuccess, isError } = mutation
    const { isPending: isPendingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct
    })
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'blue', fontSize: '20px', cursor: 'pointer' }} />
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
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, data, isError])

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
    // console.log("stateProduct", stateProduct)
    const onFinish = () => {
        mutation.mutate(stateProduct)
        // console.log("onFinish", stateProduct)
    }

    const handleOnChange = (e) => {
        setStateProduct(prev => ({
            ...prev,
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
                <TableComponent columns={columns} isPending={isPendingProducts} data={dataTable} />
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

                        {/* {stateProduct.image && (
                            <div style={{ textAlign: 'center' }}>
                                <img
                                    src={stateProduct.image}
                                    alt="preview"
                                    style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginBottom: '10px'
                                    }}
                                />
                            </div>
                        )} */}

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
        </div>
    )
}

export default AdminProduct
