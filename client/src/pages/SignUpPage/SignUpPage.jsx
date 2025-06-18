import { Image } from "antd";
import imageLogo from '../../assets/images/logo_login.png'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "../SignInPage/style";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false); // Thêm state riêng
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const handleSignUp = () => {
        console.log('sign--up', email, password, confirmPassword)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} handleOnChange={handleOnChangeEmail}></InputForm>

                    {/* Password */}
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <InputForm placeholder="Password" type={isShowPassword ? 'text' : 'password'}
                            value={password} handleOnChange={handleOnChangePassword} />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: '8px',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                            {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <InputForm placeholder="Confirm Password" type={isShowConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword} handleOnChange={handleOnChangeConfirmPassword} />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: '8px',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        >
                            {isShowConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </div>
                    </div>


                    <ButtonComponent
                        disabled={!email.length || !password.length || !confirmPassword.length}
                        onClick={handleSignUp}
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
                        textButton={'Đăng ký'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                    </ButtonComponent>
                    <p>Bạn đã có tài khoản?<WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập </WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt={'image_logo'} height='203px' width='303px'></Image>
                    <h4>Mua sắm tại GEAR VN </h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
}

export default SignUpPage;
