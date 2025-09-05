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
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(90deg, #ff1a1eff, #f7f7f7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(84, 80, 80, 0.3);
  &:hover {
    transform: scale(1.08);
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
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
    color:rgb(227, 1, 5);
`;
