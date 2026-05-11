import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import MyPage from '../pages/MyPage'
import FridgePage from '../pages/FridgePage'
import FridgeDetailPage from '../pages/FridgeDetailPage'

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

export const router = createBrowserRouter([

  // 로그인
  {
    path: '/login',
    element: <LoginPage />,
  },

  // 회원가입
  {
    path: '/signup',
    element: <SignupPage />,
  },

  // 로그인 후 접근 가능
  {
    path: '/',
    element: <MainLayout />,

    children: [

      // 홈
      {
        path: '/',
        element: <HomePage />,
      },

      // 알림
      {
        path: '/notification',
        element: <NotificationPage />,
      },

      // 마이페이지
      {
        path: '/mypage',
        element: <MyPage />,
      },

      // 냉장고 목록
      {
        path: '/fridge',
        element: <FridgePage />,
      },

      // 냉장고 상세
      {
        path: '/fridge/:id',
        element: <FridgeDetailPage />,
      },

    ],
  },

])