import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #a22a29;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  width: 1270px;
  padding: 10px 0;
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text align: left;
  }
`;

export const WrapprerHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff
    gap: 10px;
  
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  }
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    background: #b9b9b9;
    color: #fff;
`;
