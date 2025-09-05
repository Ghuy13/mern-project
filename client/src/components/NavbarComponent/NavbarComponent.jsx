import { WrapperContent, WrapperLableText, WrapperTextValue } from "./style";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarComponent = () => {
    const [typeProduct, setTypeProduct] = useState([]);
    const [activeType, setActiveType] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchAllTypeProduct = async () => {
            const res = await ProductService.getAllTypeProduct();
            if (res?.status === "OK") {
                setTypeProduct(res?.data);
            }
        };
        fetchAllTypeProduct();
    }, []);

    // cập nhật activeType khi load lại trang (dựa trên state từ router)
    useEffect(() => {
        if (location?.state) {
            setActiveType(location.state);
        }
    }, [location]);

    const handleNavigateType = (type) => {
        const urlType = type
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ /g, "_");

        navigate(`/product/${urlType}`, { state: type });
        setActiveType(type);
    };

    return (
        <div>
            <WrapperLableText>Loại sản phẩm</WrapperLableText>
            <WrapperContent>
                {typeProduct.map((item) => (
                    <WrapperTextValue
                        key={item}
                        $active={activeType === item} // truyền prop active
                        onClick={() => handleNavigateType(item)}
                    >
                        {item}
                    </WrapperTextValue>
                ))}
            </WrapperContent>
        </div>
    );
};

export default NavbarComponent;
