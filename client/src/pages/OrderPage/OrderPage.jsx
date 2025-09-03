import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Typography, Divider, Empty, Popconfirm, message, Modal, Form, Input, Space } from "antd";
import { WrapperOrderPage, WrapperTotal, WrapperFooter, WrapperButtonGroup } from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeOrderProduct, increaseAmount, decreaseAmount, clearOrder } from "../../redux/slides/orderSlice";
import { PlusOutlined, MinusOutlined, LoginOutlined } from "@ant-design/icons";
import * as OrderService from "../../services/OrderService";

const { Title, Text } = Typography;

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user); // Lấy user từ redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        localStorage.setItem("order", JSON.stringify(order));
    }, [order]);

    // Khi mở modal, tự động set email nếu có user
    useEffect(() => {
        if (isModalOpen && user?.email) {
            form.setFieldsValue({ email: user.email });
        }
    }, [isModalOpen, user, form]);

    const columns = [
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (img) => <img src={img} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số lượng",
            dataIndex: "amount",
            key: "amount",
            render: (amount, record) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => dispatch(decreaseAmount(record))}
                        disabled={amount <= 1}
                    />
                    <span style={{ minWidth: 24, textAlign: "center" }}>{amount}</span>
                    <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => dispatch(increaseAmount(record))}
                    />
                </div>
            ),
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            render: (price) => <span>{price.toLocaleString()} đ</span>,
        },
        {
            title: "Thành tiền",
            key: "total",
            render: (_, record) => <span>{(record.price * record.amount).toLocaleString()} đ</span>,
        },
        {
            title: "Xóa",
            key: "action",
            render: (_, record) => (
                <Popconfirm
                    title="Bạn có chắc muốn xóa sản phẩm này?"
                    onConfirm={() => dispatch(removeOrderProduct(record))}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button danger size="small">Xóa</Button>
                </Popconfirm>
            ),
        },
    ];

    const totalPrice = order.orderItems.reduce((sum, item) => sum + item.price * item.amount, 0);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
    };

    const handleDeleteSelected = () => {
        if (selectedRowKeys.length === 0) {
            message.warning("Vui lòng chọn sản phẩm để xóa!");
            return;
        }
        selectedRowKeys.forEach(idx => {
            const item = order.orderItems[idx];
            if (item) dispatch(removeOrderProduct(item));
        });
        setSelectedRowKeys([]);
        message.success("Đã xóa sản phẩm đã chọn!");
    };

    const handleOrder = async (values) => {
        if (!user?.access_token) {
            message.warning("Vui lòng đăng nhập để đặt hàng!");
            navigate("/sign-in");
            return;
        }

        const orderInfo = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            totalPrice,
            items: order.orderItems,
        };

        try {
            const res = await OrderService.createOrder(orderInfo, user?.access_token);
            if (res?.data?.status === "OK") {
                dispatch(clearOrder());
                localStorage.removeItem("order");
                setIsModalOpen(false);
                navigate("/order-success", { state: { orderInfo: res.data.data } });
            } else {
                message.error(res?.data?.message || "Đặt hàng thất bại!");
            }
        } catch (err) {
            if (err.response?.status === 401) {
                message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
                navigate("/sign-in");
            } else {
                message.error("Lỗi kết nối server!");
            }
        }
    };

    return (
        <WrapperOrderPage>
            <Title level={2}>Giỏ hàng của bạn</Title>
            <Divider />
            {order.orderItems.length === 0 ? (
                <Empty description="Chưa có sản phẩm nào trong giỏ hàng" />
            ) : (
                <>
                    <Table
                        dataSource={order.orderItems.map((item, idx) => ({ ...item, key: idx }))}
                        columns={columns}
                        pagination={false}
                        bordered
                        rowSelection={rowSelection}
                    />
                    <WrapperButtonGroup>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa sản phẩm đã chọn?"
                            onConfirm={handleDeleteSelected}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <Button danger disabled={selectedRowKeys.length === 0}>
                                Xóa sản phẩm đã chọn
                            </Button>
                        </Popconfirm>
                    </WrapperButtonGroup>
                    <WrapperFooter>
                        <WrapperTotal>
                            <Text strong>Tổng tiền:</Text>
                            <Text type="danger" style={{ fontSize: 20, marginLeft: 8 }}>
                                {totalPrice.toLocaleString()} đ
                            </Text>
                        </WrapperTotal>
                        {user?.access_token ? (
                            <Button
                                type="primary"
                                size="large"
                                style={{ marginLeft: 16 }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Thanh toán
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                size="large"
                                style={{ marginLeft: 16 }}
                                icon={<LoginOutlined />}
                                onClick={() => navigate("/sign-in")}
                            >
                                Đăng nhập để đặt hàng
                            </Button>
                        )}
                    </WrapperFooter>
                    <Button
                        type="default"
                        style={{ marginTop: 24 }}
                        onClick={() => navigate("/")}
                    >
                        Tiếp tục mua sắm
                    </Button>
                    <Modal
                        title="Thông tin khách hàng"
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                        destroyOnClose
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleOrder}
                        >
                            <Form.Item
                                label="Tên người nhận"
                                name="name"
                                rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Vui lòng nhập email!" },
                                    { type: "email", message: "Email không hợp lệ!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                                    { pattern: /^[0-9]{9,11}$/, message: "Số điện thoại không hợp lệ!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Đặt hàng ngay
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </WrapperOrderPage>
    );
};

export default OrderPage;