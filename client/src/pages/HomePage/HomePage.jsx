import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from '@tanstack/react-query';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";


const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounced = useDebounce(searchProduct, 500);
    const [pending, setPending] = useState(false);
    const [stateProduct, setStateProduct] = useState([])
    const [typeProduct, setTypeProduct] = useState([]);
    const [limit, setLimit] = useState(6);


    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProduct(res?.data)
        }
    }

    const { isPending, data: products, isPreviousData } = useQuery({
        queryKey: ['products', limit, searchDebounced],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data);
        } else {
            setStateProduct([]);
        }
    }, [products]);

    useEffect(() => {
        fetchAllTypeProduct();
    }, [])

    return (
        <Loading isPending={isPending || pending}>
            {/* Thanh loại sản phẩm */}
            <div style={{ maxWidth: "1320px", margin: "0 auto", marginBottom: "20px" }}>
                <WrapperTypeProduct>
                    {typeProduct.map((item) => (
                        <div className="type-chip" key={item}>
                            <TypeProduct name={item} />
                        </div>
                    ))}
                </WrapperTypeProduct>
            </div>


            <div className="body" style={{ width: "100%", backgroundColor: "#f9fafb", padding: "30px 0" }}>
                <div id="container" style={{ maxWidth: "1320px", margin: "0 auto" }}>
                    {/* Slider */}
                    <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                        <SliderComponent arrImage={[banner1, banner2, banner3]} />
                    </div>

                    {/* Danh sách sản phẩm */}
                    <WrapperProducts>
                        {stateProduct?.map((products) => (
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

                    {/* Nút Xem thêm */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <WrapperButtonMore
                            textButton="Xem thêm"
                            styleButton={{
                                border: "none",
                                background: "linear-gradient(90deg, #0b74e5, #0d5c80)",
                                color: "#fff",
                                width: "240px",
                                height: "44px",
                                borderRadius: "24px",
                                fontSize: "16px",
                                fontWeight: "500",
                                transition: "0.3s",
                            }}
                            disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                            styleTextButton={{
                                fontWeight: "500",
                                color: products?.total === products?.data?.length ? "#ccc" : "#fff",
                            }}
                            onClick={() => {
                                setLimit((prev) => prev + 6);
                            }}
                        />
                    </div>
                </div>
            </div>
        </Loading>
    );

};

export default HomePage;

