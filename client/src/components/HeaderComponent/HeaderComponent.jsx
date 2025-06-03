import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperTextHeaderSmall, WrapprerHeaderAccount } from './style';
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader >
                <Col span={6}>
                    <WrapperTextHeader>GEAR VN </WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <ButtonInputSearch
                        size="large"
                        bordered={false}
                        textButton="Tìm kiếm"
                        placeholder="Bạn tìm gì hôm nay?"
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <WrapprerHeaderAccount>
                        <WrapperTextHeaderSmall>
                            <UserOutlined style={{ fontSize: '28px' }} />
                        </WrapperTextHeaderSmall>
                        <WrapperTextHeaderSmall>
                            <span>Đăng nhập/Đăng ký </span>
                            <div>
                                <span>Tài khoản </span>
                                <CaretDownOutlined />
                            </div>
                        </WrapperTextHeaderSmall>
                    </WrapprerHeaderAccount>
                    <div>
                        <Badge count={5} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '28px', color: '#fff' }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
}
export default HeaderComponent;
