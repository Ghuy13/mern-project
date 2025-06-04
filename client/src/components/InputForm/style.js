import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: rgb(235, 239, 245);
    outline: none;
    &:focus {
        border-color: rgb(147, 141, 141);
    }
`;