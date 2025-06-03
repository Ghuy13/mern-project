import { Input } from "antd";

const InputCompnent = (size, placeholder, bordered, style, ...rests) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}
            bordered={bordered}
            style={{ style }}
            {...rests}
        />
    );
}
export default InputCompnent; 