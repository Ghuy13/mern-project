import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex; 
    align-items: center;
    gap: 12px;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 12px 16px;
    background: #f0f0f0ff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    overflow-x: auto;
    scrollbar-width: none; 
    -ms-overflow-style: none;  
    &::-webkit-scrollbar {
        display: none; 
    }

    .type-chip {
        padding: 6px 14px;
        border-radius: 20px;
        background: #f3f4f6;
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;

        &:hover {
            background: #f47171ff;
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
    }
`;

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        background: linear-gradient(90deg, #0d5c80, #0b74e5) !important;
        color: #fff !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    width: 100%;
    text-align: center;
    border-radius: 24px;
    transition: all 0.3s ease;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 30px;
    padding: 10px 0;
`;
