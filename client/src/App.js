
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import HomePage from './pages/HomePage/HomePage'
// import OrderPage from './pages/OrderPage/OrderPage'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { Fragment } from 'react/jsx-runtime'
import { use, useEffect, useState } from 'react'
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
    setIsPending(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  }

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
    setIsPending(false)
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
