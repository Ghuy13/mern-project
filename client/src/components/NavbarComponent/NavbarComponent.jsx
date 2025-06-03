import { Checkbox, Col, Rate, Row } from "antd";
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from "./style";

const NavbarComponent = () => {
    const onChange = () => { };

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option,) => (
                    <WrapperTextValue >{option}</WrapperTextValue>
                ));
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: "flex ", flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option,) => (
                            <Checkbox style={{ marginLeft: '0' }} value={option.value}>
                                {option.label}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                );
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>{`từ ${option} sao`}</span>
                        </div>

                    );
                });

            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    );
                });

            default:
                return {}
        }
    };

    return (
        <div>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Laptop', 'Laptop Gamming', 'Mac', 'Iphone'])}
            </WrapperContent>
        </div>
    );
};

export default NavbarComponent;
