
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import HomePage from './pages/HomePage/HomePage'
// import OrderPage from './pages/OrderPage/OrderPage'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { Fragment } from 'react/jsx-runtime'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'


function App() {


  // useEffect(() => {
  //   fetchApi()
  // }, [])
  // console.log("process.env.REACT_API_URL_BACKEND", process.env.REACT_APP_API_URL_BACKEND)
  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log(" ~ App ~ query:", query)
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>

  )
}
export default App
