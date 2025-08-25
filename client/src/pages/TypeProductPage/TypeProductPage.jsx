import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from '../../services/ProductService';
import { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";

const TypeProductPage = () => {
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [pending, setPending] = useState(false);
    const fetchProductType = async (type) => {
        const res = await ProductService.getProductType(type);
        setPending(true)
        if (res?.status == 'OK') {
            setPending(false)
            setProducts(res?.data)
        } else {
            setPending(false)
        }
    }
    useEffect(() => {
        if (state) {
            fetchProductType(state)
        }
    }, [state])

    const onChange = () => { }

    return (
        <Loading isPending={pending}>
            <div style={{ padding: '0 120px', background: '#efefef', }}>
                <div style={{ width: '1270px', margin: '0 auto', }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                        <WrapperNavbar span={4}>
                            <NavbarComponent></NavbarComponent>
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts >
                                {products?.map((products) => {
                                    return (
                                        <CardComponent
                                            key={products._id}
                                            countInStock={products.countInStock}
                                            description={products.description}
                                            image={products.image}
                                            name={products.name}
                                            price={products.price}
                                            rating={products.rating}
                                            type={products.type}
                                            selled={products.selled}
                                            discount={products.discount}
                                            id={products._id}
                                        />
                                    )
                                })}
                            </WrapperProducts>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                                <Pagination defaultCurrent={2} total={100} onChange={onChange} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    );
}
export default TypeProductPage;