
import { Image } from "antd";
import imageLogo from '../../assets/images/logo_login.png'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "../SignInPage/style";
import { useEffect, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as message from '../../components/Message/Message';

const SignUpPage = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleOnChangeEmail = (value) => setEmail(value);

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    );
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleNavigateSignIn()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleOnChangePassword = (value) => setPassword(value);
    const handleOnChangeConfirmPassword = (value) => setConfirmPassword(value);

    const handleNavigateSignIn = () => navigate('/sign-in');

    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword });
        console.log('sign-up', email, password, confirmPassword)
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                background:
                    'radial-gradient(1000px 300px at 10% -10%, rgba(239,68,68,0.22) 0%, rgba(239,68,68,0) 60%), ' +
                    'linear-gradient(180deg, #fafafa 0%, #f3f4f6 100%)'
            }}
        >
            <div
                style={{
                    width: '880px',
                    maxWidth: '95vw',
                    minHeight: '472px',
                    borderRadius: '16px',
                    backgroundColor: '#ffffffcc',
                    display: 'flex',
                    overflow: 'hidden',
                    boxShadow:
                        '0 10px 30px rgba(0,0,0,0.08), 0 6px 12px rgba(0,0,0,0.06)',
                    backdropFilter: 'saturate(140%) blur(6px)',
                    border: '1px solid rgba(255,255,255,0.6)'
                }}
            >
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
                        <InputForm
                            placeholder="abc@gmail.com"
                            value={email}
                            handleOnChange={handleOnChangeEmail}
                            style={{ marginBottom: 2 }}
                        />

                        {/* Password */}
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 10,
                                    transform: 'translateY(-50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: 16,
                                    padding: 4,
                                    borderRadius: 6,
                                    background: 'rgba(249,250,251,0.8)',
                                    zIndex: 5
                                }}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </div>
                            <InputForm
                                placeholder="Password"
                                type={isShowPassword ? 'text' : 'password'}
                                value={password}
                                handleOnChange={handleOnChangePassword}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 10,
                                    transform: 'translateY(-50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: 16,
                                    padding: 4,
                                    borderRadius: 6,
                                    background: 'rgba(249,250,251,0.8)',
                                    zIndex: 5
                                }}
                                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            >
                                {isShowConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </div>
                            <InputForm
                                placeholder="Confirm Password"
                                type={isShowConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                handleOnChange={handleOnChangeConfirmPassword}
                            />
                        </div>
                    </div>

                    {data?.status === 'ERR' && (
                        <span style={{ color: '#dc2626', fontSize: 13, marginTop: 6 }}>
                            {data?.message}
                        </span>
                    )}

                    <Loading isPending={isPending} delay={0}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{
                                background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                                height: 48,
                                width: '100%',
                                border: 'none',
                                borderRadius: 10,
                                margin: '20px 0 10px',
                                boxShadow: '0 8px 20px rgba(220,38,38,0.35)'
                            }}
                            textButton={'Đăng ký'}
                            styleTextButton={{ color: '#fff', fontSize: 15, fontWeight: 800, letterSpacing: 0.2 }}
                        />
                    </Loading>

                    <p style={{ marginTop: 6 }}>
                        Bạn đã có tài khoản?
                        <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight>
                    </p>
                </WrapperContainerLeft>

                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt={'image_logo'} height='203px' width='303px' />
                    <h4>Mua sắm tại Tech-Store </h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
}

export default SignUpPage;
