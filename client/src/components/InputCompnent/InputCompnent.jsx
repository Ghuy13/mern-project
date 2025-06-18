import { Input } from "antd";

const InputComponent = ({ size, placeholder, style, ...rests }) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}
            variant="borderless"
            style={style}
            {...rests}
        />
    );
}

export default InputComponent;
