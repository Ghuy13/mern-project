import Slider from "react-slick";
import { Image } from 'antd';
import { WrapperSliderStyle } from "./style";

const SliderComponent = ({ arrImage }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };
    return (
        <WrapperSliderStyle  {...settings}>
            {arrImage.map((image) => {
                return (
                    <Image src={image} alt="banner" preview={false} width="100%" height="274px" />
                )
            })}
        </WrapperSliderStyle>
    );
}
export default SliderComponent;