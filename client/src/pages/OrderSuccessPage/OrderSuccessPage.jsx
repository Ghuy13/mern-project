import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Descriptions, Result } from "antd";
import { WrapperSuccess, WrapperOrderInfo, WrapperProductList } from "./style";

const { Title } = Typography;

const OrderSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Lấy thông tin đơn hàng từ state truyền sang khi đặt hàng
    const orderInfo = location.state?.orderInfo;

    if (!orderInfo) {
        return (
            <WrapperSuccess>
                <Result
                    status="warning"
                    title="Không tìm thấy thông tin đơn hàng!"
                    extra={
                        <Button type="primary" onClick={() => navigate("/")}>
                            Về trang chủ
                        </Button>
                    }
                />
            </WrapperSuccess>
        );
    }

    return (
        <WrapperSuccess>
            <Result
                status="success"
                title="Đặt hàng thành công!"
                subTitle="Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi."
            />
            <WrapperOrderInfo>
                <Descriptions
                    bordered
                    column={1}
                    size="middle"
                    labelStyle={{ width: 140, fontWeight: 500 }}
                >
                    <Descriptions.Item label="Tên người nhận">{orderInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{orderInfo.phone}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{orderInfo.address}</Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt">
                        {orderInfo.createdAt
                            ? new Date(orderInfo.createdAt).toLocaleString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            })
                            : new Date().toLocaleString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            })
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        <span style={{ color: "#fa541c", fontWeight: 600 }}>
                            {orderInfo.totalPrice.toLocaleString()} đ
                        </span>
                    </Descriptions.Item>
                </Descriptions>
            </WrapperOrderInfo>
            <Title level={4} style={{ marginTop: 24, textAlign: "left" }}>Sản phẩm đã đặt</Title>
            <WrapperProductList>
                {orderInfo.items.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 12, background: "#f7f7f7", borderRadius: 8, padding: "6px 10px" }}>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{
                                width: 48,
                                height: 48,
                                objectFit: "cover",
                                borderRadius: 8,
                                marginRight: 12,
                                border: "1px solid #b4b1b1ff"
                            }}
                        />
                        <div>
                            <b>{item.name}</b> x {item.amount} &mdash; {(item.price * item.amount).toLocaleString()} đ
                        </div>
                    </div>
                ))}
            </WrapperProductList>
            <Button type="primary" size="large" onClick={() => navigate("/")}>
                Tiếp tục mua sắm
            </Button>
        </WrapperSuccess>
    );
};

export default OrderSuccessPage;