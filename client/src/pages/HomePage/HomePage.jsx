
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import CardComponent from "../../components/CardComponent/CardComponent";



const HomePage = () => {
    const arr = ['Iphone', 'Mac', 'LapTop', 'Watch'];
    return (
        <>
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
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
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
        </>
    );
};

export default HomePage;
