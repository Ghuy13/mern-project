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
            <div style={{ background: "#f9fafb", padding: "30px 0" }}>
                <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
                    <Row gutter={24} style={{ paddingTop: "10px" }}>
                        {/* Navbar bên trái */}
                        <WrapperNavbar span={4}>
                            <NavbarComponent />
                        </WrapperNavbar>

                        {/* Danh sách sản phẩm */}
                        <Col span={20} style={{ display: "flex", flexDirection: "column" }}>
                            <WrapperProducts>
                                {products
                                    ?.filter((pro) => {
                                        if (searchDebounced === "") {
                                            return pro;
                                        } else if (
                                            pro?.name
                                                ?.toLowerCase()
                                                .includes(searchDebounced?.toLowerCase())
                                        ) {
                                            return pro;
                                        }
                                    })
                                    ?.map((products) => (
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
                                    ))}
                            </WrapperProducts>

                            {/* Pagination */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "20px 0 0 0",
                                    padding: "12px",
                                    background: "#fff",
                                    borderRadius: "12px",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                                }}
                            >
                                <Pagination
                                    defaultCurrent={panigate?.page + 1}
                                    total={panigate?.total}
                                    onChange={onChange}
                                />
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    );

}
export default TypeProductPage;