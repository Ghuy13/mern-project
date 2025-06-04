// import { Image } from "antd";
// import imageLogo from '../../assets/images/logo_login.png'
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import InputForm from "../../components/InputForm/InputForm";
// import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "../SignInPage/style";
// ;
// const SignUpPage = () => {
//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
//             <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
//                 <WrapperContainerLeft>
//                     <h1>Xin chào</h1>
//                     <p>Đăng nhập và tạo tài khoản</p>
//                     <InputForm style={{ marginBottom: '10px' }} placeholder="Email"></InputForm>
//                     <InputForm style={{ marginBottom: '10px' }} placeholder="Password"></InputForm>
//                     <InputForm placeholder="Comfirm Password"></InputForm>
//                     <ButtonComponent
//                         bordered={false}
//                         size={40}
//                         styleButton={{
//                             background: 'rgb(255, 38, 38)',
//                             height: ' 48px',
//                             width: '100%',
//                             border: 'none',
//                             borderRadius: '4px',
//                             margin: '26px 0 10px'
//                         }}
//                         textButton={'Đăng nhập'}
//                         styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
//                     </ButtonComponent>
//                     <p>Bạn đã có tài khoản?<WrapperTextLight> Đăng ký </WrapperTextLight></p>
//                 </WrapperContainerLeft>
//                 <WrapperContainerRight>
//                     <Image src={imageLogo} preview={false} alt={'image_logo'} height='203px' width='303px'></Image>
//                     <h4>Mua sắm tại GEAR VN </h4>
//                 </WrapperContainerRight>
//             </div>
//         </div>
//     );
// }

// export default SignUpPage;

import { Image } from "antd";
import imageLogo from '../../assets/images/logo_login.png'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "../SignInPage/style";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false); // Thêm state riêng

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="Email"></InputForm>

                    {/* Password */}
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <InputForm placeholder="Password" type={isShowPassword ? 'text' : 'password'} />
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
                        <InputForm placeholder="Confirm Password" type={isShowConfirmPassword ? 'text' : 'password'} />
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
                        bordered={false}
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
                    <p>Bạn đã có tài khoản?<WrapperTextLight> Đăng ký </WrapperTextLight></p>
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
