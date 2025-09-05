import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 100%;
  background: linear-gradient(90deg, #8a1e1eff, #eccfcaff);
  color: #f3f4f6;
  padding: 40px 0 20px 0;
  font-size: 14px;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
`;

export const FooterColumn = styled.div`
  flex: 1;
  min-width: 220px;

  p {
    color: #d1d5db;
    margin-top: 8px;
    line-height: 1.6;
  }
`;

export const FooterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000000ff; /* vàng */
  margin-bottom: 12px;
`;

export const FooterLink = styled.div`
  margin-bottom: 8px;

  a {
    color: #f3f4f6;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #00b7f4ff;
    }
  }
`;

export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #e5e7eb;
  
  svg {
    color: #ec4899; /* icon hồng */
    font-size: 16px;
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 12px;
  border-top: 1px solid #374151;
  font-size: 13px;
  color: #000000ff;
`;
