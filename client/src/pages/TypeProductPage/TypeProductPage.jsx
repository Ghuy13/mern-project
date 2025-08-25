import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from '../../services/ProductService';
import { use, useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounced = useDebounce(searchProduct, 500);
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [pending, setPending] = useState(false);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1
    })
    const fetchProductType = async (type, page, limit) => {
        const res = await ProductService.getProductType(type, page, limit);
        setPending(true)
        if (res?.status == 'OK') {
            setPending(false)
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })
        } else {
            setPending(false)
        }
    }


    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }

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
                                {products?.filter((pro) => {
                                    if (searchDebounced === "") {
                                        return pro;
                                    } else if (pro?.name?.toLowerCase().includes(searchDebounced?.toLowerCase())) {
                                        return pro;
                                    }
                                })?.map((products) => {
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
                                <Pagination defaultCurrent={panigate?.page + 1} total={panigate?.total} onChange={onChange} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    );
}
export default TypeProductPage;