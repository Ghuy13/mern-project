import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Typography, Divider, Empty, Popconfirm, message } from "antd";
import { WrapperOrderPage, WrapperTotal, WrapperFooter, WrapperButtonGroup } from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeOrderProduct, increaseAmount, decreaseAmount } from "../../redux/slides/orderSlice";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        localStorage.setItem("order", JSON.stringify(order));
    }, [order]);

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
                        <Button type="primary" size="large" style={{ marginLeft: 16 }}>
                            Thanh toán
                        </Button>
                    </WrapperFooter>
                    <Button
                        type="default"
                        style={{ marginTop: 24 }}
                        onClick={() => navigate("/")}
                    >
                        Tiếp tục mua sắm
                    </Button>
                </>
            )}
        </WrapperOrderPage>
    );
};

export default OrderPage;

// 54