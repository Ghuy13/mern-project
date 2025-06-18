import { StarFilled } from '@ant-design/icons';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from "./style";
import logo from "../../assets/images/logo.png";


const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            header={{ width: "200px", height: "200px", }}
            style={{ width: 200 }}
            body={{ padding: "10px" }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img src={logo} alt='logo' style={{
                width: "68px",
                height: "14px",
                position: "absolute",
                top: "-1px",
                left: "-1px",
                borderTopLeftRadius: "3px",
            }}></img>
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReporText>
                <span style={{ marginRight: "4px" }}>
                    <span> 4.9</span> <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                </span>
                <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
            </WrapperReporText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>16.990.000₫</span>
                <WrapperDiscountText>-5%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
