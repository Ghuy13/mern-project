import Slider from "react-slick";
import { Image } from 'antd';

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
        <Slider {...settings}>
            {arrImage.map((image) => {
                return (
                    <Image src={image} alt="banner" preview={false} width="100%" height="274px" />
                )
            })}
        </Slider>
    );
}
export default SliderComponent;