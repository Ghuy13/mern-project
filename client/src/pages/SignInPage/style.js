import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px; 
    display: flex;
    flex-direction: column;
`;

export const WrapperContainerRight = styled.div`
    width: 300px;
    background: linear-gradient(136deg, rgba(190, 190, 190, 0.5) -1%, rgba(169, 169, 169, 0.5) 85%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`;

export const WrapperTextLight = styled.span`
    color: rgb(123, 123, 123);
    font-size: 13px;
    cursor: pointer;
`