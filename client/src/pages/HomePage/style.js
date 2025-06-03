import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex; 
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    border-bottom: 2px solid #ccc;
    height: 44px;
    font-size: 15px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        background:rgb(13, 92, 128);
        color: #fff;
        span {
            color:rgb(11, 64, 75);;
        }
    }
    width: 100%;
    text-align: center;
`
export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap : 15px;
    margin-top: 20px;
    flex-wrap: wrap;
`
