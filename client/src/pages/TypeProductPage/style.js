
import { Col } from "antd";
import styled from "styled-components";

// Wrapper cho phần danh sách sản phẩm
export const WrapperProducts = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
`;

// Wrapper cho phần navbar bên trái
export const WrapperNavbar = styled(Col)`
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    border-radius: 4px;
    height: fit-content;
    margin-top: 20px;
    width: 200px;
`;
