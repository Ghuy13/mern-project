import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import HomePage from './pages/HomePage/HomePage'
// import OrderPage from './pages/OrderPage/OrderPage'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { Fragment } from 'react/jsx-runtime'
import { useEffect, useState } from 'react'
import { isJsonString } from './untils'
import { jwtDecode } from "jwt-decode";
import * as UserService from '../src/services/UserService';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlice'
import Loading from './components/LoadingComponent/LoadingComponent'
// import axios from 'axios'



function App() {
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsPending(true);
    const { decoded, token, user } = handleDecoded();
    if (decoded?.id) {
      // Nếu có user trong localStorage thì dispatch lên Redux
      if (user) {
        dispatch(updateUser({ ...user, access_token: token }));
      } else {
        // Nếu chưa có user, gọi API lấy thông tin user
        handleGetDetailsUser(decoded.id, token);
      }
    }
    setIsPending(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch(updateUser({ ...JSON.parse(user), access_token: token }));
    }
  }, []);

  const handleDecoded = () => {
    const token = localStorage.getItem('access_token');
    let decoded = {};
    if (token) {
      decoded = jwtDecode(token);
    }
    // Nếu bạn lưu user vào localStorage khi đăng nhập:
    const user = localStorage.getItem('user');
    return { decoded, token, user: user ? JSON.parse(user) : null };
  };

  UserService.axiosJWT.interceptors.request.use(async function (config) {
    const currentTime = new Date()
    const { decoded } = handleDecoded()

    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken();
      config.headers['token'] = `Bearer ${data?.access_token}`;
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));

  }

  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              if (!ischeckAuth) return null;// Không render nếu không đủ quyền
              return (
                <Route key={route.path} path={ischeckAuth && route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>

  )
}
export default App
