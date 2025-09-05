import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #1677ff;
    font-size: 29px
`
export const WrapperUploadFile = styled(Upload)`
  &.ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }& .ant-upload-list-item-container {
    display: none;
  }
`;