import {
  FcBarChart,
  FcLike,
  FcCurrencyExchange,
  FcTodoList,
  FcCalendar,
  FcViewDetails,
  FcSettings,
} from 'react-icons/fc';

export const SidebarList = [
  {
    title: '대시보드',
    path: '/dashboard',
    icon: <FcBarChart />,
    cName: 'nav-text',
  },
  {
    title: '수입/지출 내역',
    path: '/transaction',
    icon: <FcLike />,
    cName: 'nav-text',
  },
  {
    title: '카드/계좌',
    path: '/payment-method',
    icon: <FcCurrencyExchange />,
    cName: 'nav-text',
  },
  {
    title: '카테고리/태그',
    path: '/category',
    icon: <FcTodoList />,
    cName: 'nav-text',
  },
  {
    title: '달력',
    path: '/calendar',
    icon: <FcCalendar />,
    cName: 'nav-text',
  },
  {
    title: '보고서',
    path: '/analysis',
    icon: <FcViewDetails />,
    cName: 'nav-text',
  },
  {
    title: '설정',
    path: '/setting',
    icon: <FcSettings />,
    cName: 'nav-text',
  },
];
