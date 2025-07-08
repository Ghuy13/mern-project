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
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isPending={isPending} delay={0}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm
                            style={{ width: '300px' }}
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
                            style={{ width: '300px' }}
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
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm
                            style={{ width: '300px' }}
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
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm
                            style={{ width: '300px' }}
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
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile
                            customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                            onChange={handleOnchangeAvatar}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }} alt="avatar"></img>
                        )}
                        {/* <InputForm
                            style={{ width: '300px' }}
                            id='avatar'
                            value={avatar}
                            handleOnChange={handleOnchangeAvatar}
                        /> */}
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