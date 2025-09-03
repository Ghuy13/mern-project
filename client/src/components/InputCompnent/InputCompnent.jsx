import { Input } from "antd";

const InputComponent = ({ size, placeholder, style, textButton, ...rests }) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}
            style={style}
            {...rests}
        />
    );
}

export default InputComponent;
