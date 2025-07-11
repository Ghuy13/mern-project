import { Menu } from 'antd'
import { getItem } from '../../untils'
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />,),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />,),
    ]
    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser></AdminUser>
                )
            case 'product':
                return (
                    <AdminProduct></AdminProduct>
                )
            default:
                return <></>
        }
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    console.log('keySelected', keySelected)
    return (
        <>
            <HeaderComponent isHiddenSearch={true} isHiddenCart={true} />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        height: '100vh',
                        boxShadow: '1px 1px 2px #ccc',
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}
export default AdminPage
