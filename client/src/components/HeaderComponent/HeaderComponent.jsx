import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperTextHeaderSmall, WrapprerHeaderAccount } from './style';
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
    const navigate = useNavigate() // Lấy hàm 'navigate' từ React Router để chuyển hướng trang
    const user = useSelector((state) => state.user)
    console.log('user', user)
    const handleNavigateLogin = () => {
        navigate('/sign-in')  // Gọi hàm 'navigate' để chuyển hướng người dùng đến đường dẫn '/sign-in'
    }
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
                    <WrapprerHeaderAccount>
                        <WrapperTextHeaderSmall>
                            <UserOutlined style={{ fontSize: '28px' }} />
                        </WrapperTextHeaderSmall>
                        {user?.name ? (
                            <div style={{ cursor: 'pointer' }}>{user.name}</div>
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
