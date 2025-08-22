import { StarFilled } from '@ant-design/icons';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from "./style";
import logo from "../../assets/images/logo.png";


const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, selled, discount } = props;

    return (
        <WrapperCardStyle
            hoverable
            header={{ width: "200px", height: "200px", }}
            style={{ width: 200 }}
            body={{ padding: "10px" }}
            cover={<img alt="example" src={image} />}
        >
            <img src={logo} alt='logo' style={{
                width: "68px",
                height: "14px",
                position: "absolute",
                top: "-1px",
                left: "-1px",
                borderTopLeftRadius: "3px",
            }}></img>
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReporText>
                <span style={{ marginRight: "4px" }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                </span>
                <WrapperStyleTextSell>| Đã bán {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReporText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{price.toLocaleString()}</span>
                <WrapperDiscountText>
                    - {discount || 5}%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
