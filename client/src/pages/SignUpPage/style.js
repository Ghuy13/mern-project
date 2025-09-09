import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 48px 56px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* Typography nhẹ nhàng */
  & > h1 {
    margin: 0;
    font-size: 28px;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: 0.2px;
    color: #111827;
  }

  & > p {
    margin: -2px 0 8px;
    color: #6b7280;
    font-size: 14px;
  }
`;

export const WrapperContainerRight = styled.div`
  width: 320px;
  background:
    radial-gradient(1200px 300px at 0% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255,255,255,0) 60%),
    linear-gradient(136deg, rgba(255, 66, 66, 0.9) -10%, rgba(220, 38, 38, 0.95) 60%, rgba(153, 27, 27, 0.95) 110%);
  color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 16px;

  h4 {
    margin: 8px 0 0;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.1);
  }
`;

export const WrapperTextLight = styled.span`
  color: #ef4444; /* đỏ chủ đạo */
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-left: 6px;

  &:hover {
    color: #dc2626;
    text-decoration: underline;
  }
`;
