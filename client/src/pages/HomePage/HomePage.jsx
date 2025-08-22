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
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";


const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounced = useDebounce(searchProduct, 1000);
    const refSearch = useRef();
    const [pending, setPending] = useState(false);
    const [stateProduct, setStateProduct] = useState([])
    const arr = ['Iphone', 'Mac', 'LapTop', 'Watch'];

    const fetchProductAll = async (search) => {
        const res = await ProductService.getAllProduct(search);
        return res;
    }

    // useEffect(() => {
    //     if (refSearch.current) {
    //         setPending(true);
    //         fetchProductAll(searchDebounced)
    //     }
    //     refSearch.current = true;
    //     setPending(false);
    // }, [searchDebounced])

    const { isPending, data: products } = useQuery({
        queryKey: ['products', searchDebounced],
        queryFn: () => fetchProductAll(searchDebounced),
        retry: 3,
        retryDelay: 1000,
        enabled: !!searchDebounced,
    });

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data);
        } else {
            setStateProduct([]); // clear khi không có kết quả
        }
    }, [products]);

    return (
        <Loading isPending={isPending || pending} >
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTypeProduct>
            </div>
            <div className="body" style={{ width: '100%', backgroundColor: "#efefef" }}>
                <div id="container" style={{ height: "1000px", width: "1270px", margin: "0 auto" }}>
                    <SliderComponent arrImage={[banner1, banner2, banner3]} />
                    <WrapperProducts>
                        {stateProduct?.map((products) => {
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
                                />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <WrapperButtonMore
                            textButton="Xem thêm"
                            styleButton={{
                                border: "1px solid rgb(11, 116, 229)",
                                color: "rgb(11, 116, 229)",
                                width: "240px",
                                height: "38px",
                                borderRadius: "4px",
                            }}
                            styleTextButton={{ fontWeight: "500" }}
                        />
                    </div>
                </div >
            </div>
        </Loading>
    );
};

export default HomePage;

