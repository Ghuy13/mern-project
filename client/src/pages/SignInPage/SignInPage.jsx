import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import imageLogo from '../../assets/images/logo_login.png';
import { Image } from "antd";
import { useState, useEffect } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../redux/slides/userSlice";

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    );
    const { data, isPending, isSuccess, } = mutation;

    useEffect(() => {
        if (isSuccess && data?.access_token) {
            localStorage.setItem('access_token', data.access_token);
            if (data.refresh_token) {
                localStorage.setItem('refresh_token', data.refresh_token);
            }
            const decoded = jwtDecode(data.access_token);
            if (decoded?.id) {
                handleGetDetailsUser(decoded.id, data.access_token);
            }
            if (location?.state?.from) {
                navigate(location.state.from);
            } else {
                navigate('/');
            }
        }
    }, [isSuccess, data, location, navigate]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    }

    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    };
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangePassword = (value) => {
        setPassword(value);
    };

    const handleSignIn = () => {
        mutation.mutate({ email, password });
    };

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
                            handleOnChange={handleOnchangeEmail}
                        />

                        <div style={{ position: 'relative' }}>
                            <span
                                style={{
                                    zIndex: 10,
                                    position: 'absolute',
                                    top: '50%',
                                    right: 10,
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    fontSize: 16,
                                    padding: 4,
                                    borderRadius: 6,
                                    background: 'rgba(249,250,251,0.8)'
                                }}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                            <InputForm
                                placeholder="Password"
                                type={isShowPassword ? 'text' : 'password'}
                                value={password}
                                handleOnChange={handleOnchangePassword}
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
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
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
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff', fontSize: 15, fontWeight: 800, letterSpacing: 0.2 }}
                        />
                    </Loading>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        <p style={{ margin: 0 }}>
                            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
                        </p>
                        <p style={{ margin: 0 }}>
                            Chưa có tài khoản?
                            <WrapperTextLight onClick={handleNavigateSignUp}>
                                Tạo tài khoản
                            </WrapperTextLight>
                        </p>
                    </div>
                </WrapperContainerLeft>

                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt={'image_logo'} height='203px' width='303px' />
                    <h4>Mua sắm tại Tech-Store </h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignInPage;
