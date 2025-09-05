import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: #000000ff;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e5e7eb;
`;

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const WrapperTextValue = styled.div`
    color: ${(props) => (props.$active ? "#f47171" : "#374151")};  
    font-size: 14px;
    font-weight: 500;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${(props) => (props.$active ? "#fee2e2" : "transparent")};

    &:hover {
        background: ${(props) => (props.$active ? "#fee2e2" : "#f3f4f6")};
        color: ${(props) => (props.$active ? "#f47171" : "#000000ff")};
        transform: translateX(4px);
    }
`;
