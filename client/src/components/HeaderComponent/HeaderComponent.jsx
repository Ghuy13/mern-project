import { Badge, Col, Popover } from 'antd';
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
import { useEffect, useState } from 'react';
import { searchProduct } from '../../redux/slides/productSlice';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate() // Lấy hàm 'navigate' từ React Router để chuyển hướng trang
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch() // Lấy hàm 'dispatch' từ Redux để gửi các action
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
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

    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );
    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: 'rgb(162, 42, 41)' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader>GEAR VN </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm kiếm"
                            placeholder="Bạn tìm gì hôm nay?"
                            onChange={onSearch}
                        />
                    </Col>
                )}

                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading isPending={loading} delay={0}>
                        <WrapprerHeaderAccount>
                            {/* Avatar và tên người dùng */}
                            {userAvatar ? (
                                <img src={userAvatar} alt='avatar' style={{
                                    height: '35px',
                                    width: '35px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }} />
                            ) : (
                                <WrapperTextHeaderSmall>
                                    <UserOutlined style={{ fontSize: '28px' }} />
                                </WrapperTextHeaderSmall>
                            )}

                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
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
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge count={5} size='small'>
                                <ShoppingCartOutlined style={{ fontSize: '28px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div >
    );
}
export default HeaderComponent;
