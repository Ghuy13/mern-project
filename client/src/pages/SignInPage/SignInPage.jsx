import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import imageLogo from '../../assets/images/logo_login.png';
import { Image } from "antd";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";



const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = () => {
        console.log('sign--in', email, password)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} handleOnChange={handleOnchangeEmail} ></InputForm>
                    {/*  */}
                    <div style={{ position: 'relative' }}>
                        <span
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '50%',
                                right: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transform: 'translateY(-50%)',
                            }}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                            {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>

                        <InputForm placeholder="Password" type={isShowPassword ? 'text' : 'password'} value={password} handleOnChange={handleOnchangePassword}></InputForm>
                    </div>
                    {/*  */}
                    <ButtonComponent
                        disabled={!email.length || !password.length}
                        onClick={handleSignIn}
                        // bordered={false}
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 38, 38)',
                            height: ' 48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: '26px 0 10px'

                        }}
                        textButton={'Đăng nhập'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p>Chưa có tài khoản?<WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt={'image_logo'} height='203px' width='303px'></Image>
                    <h4>Mua sắm tại GEAR VN </h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
}

export default SignInPage;