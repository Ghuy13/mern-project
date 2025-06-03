import { Button, } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import InputCompnent from "../InputCompnent/InputCompnent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, bordered,
        backgroundColorInput = "#fff",
        backgroundColorButton = "#cccccc",
        colorButton = "#ff",
    } = props;
    return (
        <div style={{ display: 'flex' }}>
            <InputCompnent
                size={size}
                placeholder={placeholder}
                bordered={false}
                style={{ backgroundColor: backgroundColorInput }}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined color={colorButton} style={{ color: colorButton }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton, }}
            />
        </div>
    );
}

export default ButtonInputSearch;