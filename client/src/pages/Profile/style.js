import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #2c3e50;
  font-size: 24px;
  margin: 20px 0;
  text-align: center;
  font-weight: 600;
`;

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    width: 700px; 
    margin: 30px auto;   
    padding: 40px;
    border-radius: 12px; 
    gap: 25px;
`;

export const WrapperLabel = styled.label`
    color: #34495e;
    font-size: 14px;
    line-height: 30px;
    font-weight: 600;
    width: 80px;
    text-align: left; 
`;

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #b5cdf9ff;
        border-radius: 8px;
    }
`;

export const WrapperUploadFile = styled(Upload)`
  &.ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px dashed #3498db;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #2980b9;
    }
  }
  & .ant-upload-list-item-container {
    display: none;
  }
`;