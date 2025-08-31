import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Typography, Tag, Card, Divider } from "antd";
import * as OrderService from "../../services/OrderService";
const { Title } = Typography;

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await OrderService.getAllOrder();
                if (res?.data?.status === "OK") {
                    setOrders(res.data.data);
                }
            } catch (err) {
                message.error("Không lấy được danh sách đơn hàng!");
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    const handleCancelOrder = async (id) => {
        try {
            const res = await OrderService.deleteOrder(id);
            if (res?.data?.status === "OK") {
                setOrders(prev => prev.filter(order => order._id !== id));
                message.success("Đã hủy đơn hàng!");
            } else {
                message.error(res?.data?.message || "Hủy đơn hàng thất bại!");
            }
        } catch (err) {
            message.error("Lỗi kết nối server!");
        }
    };

    const columns = [
        {
            title: "Mã đơn",
            dataIndex: "_id",
            key: "_id",
            render: (id) => <Tag color="blue">{id.slice(-6).toUpperCase()}</Tag>
        },
        {
            title: "Ngày đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => (
                <span>
                    {new Date(date).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}
                </span>
            )
        },
        {
            title: "Tên người nhận",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price) => <b style={{ color: "#fa541c" }}>{price.toLocaleString()} đ</b>
        },
        {
            title: "Sản phẩm",
            dataIndex: "items",
            key: "items",
            render: (items) => (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#f7f7f7",
                            borderRadius: 6,
                            padding: "4px 8px"
                        }}>
                            <img src={item.image} alt={item.name} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4, marginRight: 8, border: "1px solid #eee" }} />
                            <span style={{ fontWeight: 500 }}>{item.name}</span>
                            <span style={{ margin: "0 8px", color: "#888" }}>x {item.amount}</span>
                            <span style={{ color: "#1677ff", fontWeight: 500 }}>{(item.price * item.amount).toLocaleString()} đ</span>
                        </div>
                    ))}
                </div>
            )
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Popconfirm
                    title="Bạn chắc chắn muốn hủy đơn hàng này?"
                    onConfirm={() => handleCancelOrder(record._id)}
                    okText="Hủy đơn"
                    cancelText="Không"
                >
                    <Button danger>Hủy đơn</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div style={{
            maxWidth: 1200,
            margin: "40px auto",
            background: "#fff",
            padding: 32,
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)"
        }}>
            <Title level={2} style={{ color: "#1677ff", marginBottom: 24 }}>Đơn hàng của bạn</Title>
            <Divider />
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default MyOrdersPage;