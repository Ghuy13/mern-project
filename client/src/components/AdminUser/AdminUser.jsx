import { Button, Form, Space } from "antd"
import { WrapperHeader } from "./style"
import TableComponent from "../TableComponent/TableComponent"
import InputComponent from "../InputCompnent/InputCompnent"
import DrawerComponent from "../DrawerComponent/DrawerComponent"
import Loading from "../LoadingComponent/LoadingComponent"
import { getBase64 } from "../../untils"
import { useEffect, useRef, useState } from "react"
import * as message from '../../components/Message/Message';
import { useSelector } from "react-redux"
import { useMutationHooks } from "../../hooks/useMutationHook"
import * as UserService from '../../services/UserService'
import { useQuery } from "@tanstack/react-query"
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import ModalComponent from "../ModalComponent/ModalComponent"


const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [fileList, setFileList] = useState([])
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    })
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    })

    const [form] = Form.useForm()
    const [formDetails] = Form.useForm();

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        return UserService.updateUser(id, { ...rests }, token);
    });

    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data;
        return UserService.deleteUser(id, token);
    });

    const getAllUsers = async () => {
        if (!user?.access_token) {
            throw new Error('Vui lòng đăng nhập để lấy danh sách người dùng');
        }
        const res = await UserService.getAllUser(user?.access_token);
        console.log('res', res);
        return res;
    };

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data.name,
                email: res?.data.email,
                phone: res?.data.phone,
                isAdmin: res?.data.isAdmin,
            })
        }
        setIsPendingUpdate(false)
    }

    useEffect(() => {
        if (isOpenDrawer) {
            formDetails.setFieldsValue(stateUserDetails)
        }
    }, [formDetails, stateUserDetails, isOpenDrawer])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected])


    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }


    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const queryUser = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers
    })
    const { isPending: isPendingUsers, data: users } = queryUser

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
    };
    const handleReset = clearFilters => {
        clearFilters();
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
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];

    const dataTable = users?.data?.length
        ? users.data.map((user) => ({
            ...user,
            key: user._id,
            isAdmin: user.isAdmin ? 'TRUE' : 'FALSE',
        }))
        : [];

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
    const handleDeleteUser = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
    }

    const handleOnChangeDetails = (e) => {
        setStateUserDetails(prev => ({
            ...prev,
            ...stateUserDetails,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnchangeAvatar = async ({ fileList: newFileList }) => {
        const file = newFileList[0]
        if (file && !file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setFileList(newFileList)

        setStateUser(prev => ({
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
        setStateUserDetails({
            ...stateUserDetails,
            image: file?.preview
        })
    }

    const onUpdateUser = async () => {
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            ...stateUserDetails
        }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isPending={isPendingUsers} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        },
                    };
                }} />
            </div>
            <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='40%'>
                <Loading isPending={isPendingUpdate || isPendingUpdated} delay={0}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onUpdateUser}
                        autoComplete="on"
                        form={formDetails}
                    >
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                            <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name='name' />
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input product email!' }]}>
                            <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name='email' />
                        </Form.Item>

                        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input phone!' }]}>
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name='phone' />
                        </Form.Item>

                        {/* <Form.Item
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
                        </Form.Item> */}
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
                title="Xóa người dùng"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteUser}
            >
                <Loading isPending={isPendingDeleted} delay={0}>
                    <div>Bạn có muốn xóa người dùng này không ?</div>
                </Loading>
            </ModalComponent>

        </div>

    )
}

export default AdminUser