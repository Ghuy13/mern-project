import { WrapperContent, WrapperLableText, WrapperTextValue } from "./style";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    const [typeProduct, setTypeProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllTypeProduct = async () => {
            const res = await ProductService.getAllTypeProduct();
            if (res?.status === 'OK') {
                setTypeProduct(res?.data);
            }
        };
        fetchAllTypeProduct();
    }, []);

    const handleNavigateType = (type) => {
        // Chuẩn hóa giống HomePage/TypeProduct.jsx
        const urlType = type.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
        navigate(`/product/${urlType}`, { state: type });
    };

    return (
        <div>
            <WrapperLableText>Loại sản phẩm</WrapperLableText>
            <WrapperContent>
                {typeProduct.map((item) => (
                    <WrapperTextValue
                        key={item}
                        style={{ cursor: "pointer" }}
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