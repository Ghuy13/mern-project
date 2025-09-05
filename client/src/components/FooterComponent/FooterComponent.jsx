import { FooterWrapper, FooterContainer, FooterColumn, FooterTitle, FooterLink, FooterInfo, FooterBottom } from "./style";
import { Link } from "react-router-dom";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

const FooterComponent = () => {
    return (
        <FooterWrapper>
            <FooterContainer>
                <FooterColumn>
                    <FooterTitle>Cửa hàng TEACH-STORE</FooterTitle>
                    <p>Chuyên cung cấp sản phẩm chất lượng, giá tốt và dịch vụ tận tâm.</p>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Liên kết nhanh</FooterTitle>
                    <FooterLink><Link to="/about">Giới thiệu</Link></FooterLink>
                    <FooterLink><Link to="/products">Sản phẩm</Link></FooterLink>
                    <FooterLink><Link to="/contact">Liên hệ</Link></FooterLink>
                    <FooterLink><Link to="/faq">Hỏi đáp</Link></FooterLink>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Thông tin liên hệ</FooterTitle>
                    <FooterInfo><EnvironmentOutlined /> 69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh 70000</FooterInfo>
                    <FooterInfo><PhoneOutlined /> 0909 123 456</FooterInfo>
                    <FooterInfo><MailOutlined /> techshop@gmail.com</FooterInfo>
                </FooterColumn>
            </FooterContainer>

            <FooterBottom>
                &copy; {new Date().getFullYear()} Tech Shop. All rights reserved.
            </FooterBottom>
        </FooterWrapper>
    );
};

export default FooterComponent;
