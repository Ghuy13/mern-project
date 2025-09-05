
// import { Col } from "antd";
// import styled from "styled-components";

// // Wrapper cho phần danh sách sản phẩm
// export const WrapperProducts = styled.div`
//     display: flex;
//     gap: 12px;
//     margin-top: 20px;
//     flex-wrap: wrap;
// `;

// // Wrapper cho phần navbar bên trái
// export const WrapperNavbar = styled(Col)`
//     background: #fff;
//     margin-right: 10px;
//     padding: 10px;
//     border-radius: 4px;
//     height: fit-content;
//     margin-top: 20px;
//     width: 200px;
// `;


import { Col } from "antd";
import styled from "styled-components";

// Danh sách sản phẩm dạng grid
export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 20px;
    padding: 10px 0;
`;

// Navbar bên trái
export const WrapperNavbar = styled(Col)`
    background: #fff;
    padding: 20px 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    height: fit-content;
    margin-top: 20px;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
`;
