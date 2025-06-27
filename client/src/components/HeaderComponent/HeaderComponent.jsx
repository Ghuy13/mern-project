import { Badge, Button, Col, Popover } from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperTextHeader, WrapperTextHeaderSmall, WrapprerHeaderAccount } from './style';
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlice';
import { useDispatch } from 'react-redux';
import Loading from '../LoadingComponent/LoadingComponent';
import React, { useState } from 'react';

const HeaderComponent = () => {
    const navigate = useNavigate() // Lấy hàm 'navigate' từ React Router để chuyển hướng trang
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch() // Lấy hàm 'dispatch' từ Redux để gửi các action
    const [loading, setloading] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/sign-in')  // Gọi hàm 'navigate' để chuyển hướng người dùng đến đường dẫn '/sign-in'
    }
    const handleLogout = async () => {
        setloading(true)
        await UserService.logoutUser(); // Gọi hàm 'logoutUser' từ UserService để đăng xuất người dùng
        dispatch(resetUser())
        setloading(false)
    }
    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
            <WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>
        </div>
    );
    return (
        // new comment
        <div style={{ wirth: '100%', display: 'flex', justifyContent: 'center', background: 'rgb(162, 42, 41)' }}>
            <WrapperHeader >
                <Col span={5}>
                    <WrapperTextHeader>GEAR VN </WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        textButton="Tìm kiếm"
                        placeholder="Bạn tìm gì hôm nay?"
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading isPending={loading} delay={0}>
                        <WrapprerHeaderAccount>
                            <WrapperTextHeaderSmall>
                                <UserOutlined style={{ fontSize: '28px' }} />
                            </WrapperTextHeaderSmall>
                            {user?.name ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer' }}>{user.name}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}

                        </WrapprerHeaderAccount>
                    </Loading>
                    {/* Giỏ hàng */}
                    <div>
                        <Badge count={5} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '28px', color: '#fff' }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div >
    );
}
export default HeaderComponent;
