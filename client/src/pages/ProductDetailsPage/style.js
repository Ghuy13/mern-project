import styled from "styled-components";

export const PageWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5; /* nền xám rất nhẹ để nổi card */
  display: flex;
`;

export const Container = styled.div`
  width: 1270px;
  margin: 0 auto;
  padding: 24px 0 40px 0;
  /* Responsive nhẹ */
  @media (max-width: 1366px) {
    width: 95%;
  }
`;

export const BreadcrumbBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

export const CrumbButton = styled.span`
  cursor: pointer;
  font-weight: 600;
  color: #a22a29;            /* đỏ chủ đạo */
  transition: color 0.2s ease;
  &:hover {
    color: #e30105;          /* đỏ sáng hơn khi hover */
    text-decoration: underline;
  }
`;

export const CrumbDivider = styled.span`
  opacity: 0.6;
`;

export const TitleRow = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 800;
  color: #222;
  letter-spacing: 0.2px;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  padding: 20px;
  /* để component bên trong thoáng, không tràn */
  overflow: hidden;

  /* viền nhấn đỏ rất mảnh cho hợp tone */
  border: 1px solid rgba(162, 42, 41, 0.12);
`;
