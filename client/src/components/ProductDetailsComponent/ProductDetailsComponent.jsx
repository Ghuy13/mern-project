import { Col, Image, Rate, Row } from "antd";
import imageProductSmall from '../../assets/images/imageSmall.png';
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualitytProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query';
import Loading from "../LoadingComponent/LoadingComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlice";
import { convertPrice } from "../../untils";

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const onChange = (value) => {
        setNumProduct(Number(value));
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data;
        }
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else {
            setNumProduct(numProduct > 1 ? numProduct - 1 : 1);
        }
    }

    const { isPending, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct,
    });
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: { from: location?.pathname } });
        } else {
            dispatch(addOrderProduct({
                name: productDetails?.name,
                amount: numProduct,
                image: productDetails?.image,
                price: productDetails?.price,
                product: productDetails?._id,
            }))
        }
    }
    return (
        <Loading isPending={isPending}>
            <Row style={{ padding: '16px', background: "#fff", borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e7eb', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt='image product' preview={false}></Image>
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
                        {productDetails?.name}
                    </WrapperStyleNameProduct>
                    <div>
                        < Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell>Đã bán 1000+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct> {convertPrice(productDetails?.price)} </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến</span>
                        <span className="address">{user?.address}</span>
                        <span className="change-address">Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualitytProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualitytProduct>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 38, 38)',
                                height: ' 48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            onClick={handleAddOrderProduct}
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
        </Loading>
    );
}
export default ProductDetailsComponent;