import { Col, Image, InputNumber, Row } from "antd";
import imageProduct from '../../assets/images/test.png';
import imageProductSmall from '../../assets/images/imageSmall.png';
import { WrapperAddressProduct, WrapperBtnQualitytProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualitytProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailsComponent = () => {
    const onChange = () => { }
    return (
        <Row style={{ padding: '16px', background: "#fff", borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e7eb', paddingRight: '8px' }}>
                <Image src={imageProduct} alt='image product' preview={false}></Image>
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between', }} >
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}></WrapperStyleImageSmall>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}></WrapperStyleImageSmall>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}></WrapperStyleImageSmall>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}></WrapperStyleImageSmall>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}></WrapperStyleImageSmall>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product small' preview={false}></WrapperStyleImageSmall>
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct>
                    Laptop MSI Gaming Thin A15 B7UC-261VN R5 7535HS/16GB/512GB/15.6" FHD/RTX3050_4GB/Win11_Balo
                </WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }}></StarFilled>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }}></StarFilled>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }}></StarFilled>
                    <WrapperStyleTextSell>Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct> 16.890.000 ₫</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến</span>
                    <span className="address">Q8, Hồ Chính Minh</span>
                    <span className="change-address">Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', }}>
                    <div style={{ marginBottom: '10px' }}>Số lượng</div>
                    <WrapperQualitytProduct>
                        <button style={{ border: 'none', background: 'transparent', }}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                        <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </WrapperQualitytProduct>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <ButtonComponent
                        // bordered={false}
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 38, 38)',
                            height: ' 48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px',
                        }}
                        textButton={'Mua Ngay'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>

                    <ButtonComponent
                        bordered={false}
                        size={40}
                        styleButton={{
                            background: 'rgb(73, 97, 131)',
                            height: ' 48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px',
                        }}
                        textButton={'Mua Trả Góp'}
                        styleTextButton={{ color: '#fff', fontSize: '15px' }}>
                    </ButtonComponent>
                </div>
            </Col>
        </Row>
    );
}
export default ProductDetailsComponent;