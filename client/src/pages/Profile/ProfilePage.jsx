import { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector, useDispatch } from "react-redux";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSlice';
import { Button, } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from "../../untils";


const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const mutation = useMutationHooks(
        ({ id, access_token, ...rest }) => {
            return UserService.updateUser(id, rest, access_token);
        }
    );

    const dispatch = useDispatch();
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        if (res?.data) {
            dispatch(updateUser({ ...res.data, access_token: token }));
        }
    };


    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangeName = (value) => {
        setName(value);
    };
    const handleOnchangePhone = (value) => {
        setPhone(value);
    };
    const handleOnchangeAddress = (value) => {
        setAddress(value);
    };
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            access_token: user?.access_token,
            name,
            email,
            phone,
            address,
            avatar
        });
    }
    return (
        <div style={{ width: '100%', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f5f6fa', padding: '20px 0' }}>
            <WrapperHeader>Thông tin cá nhân</WrapperHeader>
            <Loading isPending={isPending} delay={0}>
                <WrapperContentProfile>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '120px',
                                width: '120px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid #3498db',
                                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                            }} alt="avatar" />
                        )}
                    </div>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Họ tên</WrapperLabel>
                        <InputForm
                            style={{ width: '400px', height: '40px', borderRadius: '8px' }}
                            id='name'
                            value={name}
                            handleOnChange={handleOnchangeName}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(54, 139, 230)', fontSize: '15px', fontWeight: '700' }}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm
                            style={{ width: '400px', height: '40px', borderRadius: '8px' }}
                            id='email'
                            value={email}
                            handleOnChange={handleOnchangeEmail}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(54, 139, 230)', fontSize: '15px', fontWeight: '700' }}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Điện thoại</WrapperLabel>
                        <InputForm
                            style={{ width: '400px', height: '40px', borderRadius: '8px' }}
                            id='phone'
                            value={phone}
                            handleOnChange={handleOnchangePhone}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(54, 139, 230)', fontSize: '15px', fontWeight: '700' }}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                        <InputForm
                            style={{ width: '400px', height: '40px', borderRadius: '8px' }}
                            id='address'
                            value={address}
                            handleOnChange={handleOnchangeAddress}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(54, 139, 230)', fontSize: '15px', fontWeight: '700' }}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>
                        <WrapperUploadFile
                            customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                            onChange={handleOnchangeAvatar}
                            maxCount={1}
                        >
                            <Button
                                icon={<UploadOutlined />}
                                style={{
                                    borderRadius: '8px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                Chọn ảnh
                            </Button>
                        </WrapperUploadFile>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(54, 139, 230)', fontSize: '15px', fontWeight: '700' }}
                        />
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div>
    );
}
export default ProfilePage;