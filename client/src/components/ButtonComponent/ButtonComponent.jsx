import { Button } from "antd";

const ButtonComponent = ({ textButton, size, styleButton, styleTextButton, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size}

            {...rests}

        ><span style={styleTextButton}>{textButton}</span></Button>
    );
}
export default ButtonComponent;