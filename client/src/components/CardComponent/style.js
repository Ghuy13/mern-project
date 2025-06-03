
import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200%;
    & img {
        width: 200px;
        height: 200px;
    }
    position: relative;
`;

export const StyleNameProduct = styled.div
    `
    font-weight: 600;
    fonrt-size: 12px;
    line-height: 16px;
    color: rgba(56, 56 61);
`;
export const WrapperReporText = styled.div
    `
    font-size: 12px;
    color: rgba(128, 128, 137);
    display: flex;  
    align-items: center;
`;
export const WrapperPriceText = styled.div
    `
    color: #ff4c57;
    fontsize: 16px;
    font-weight: 500;
    margin: 6px 0 0;
`;
export const WrapperDiscountText = styled.span
    `
    color:rgb(228, 105, 114);
    fontsize: 12px;
    font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`