import * as FcIcons from 'react-icons/fc';

export const SidebarList = [
  {
    title: '대시보드',
    path: '/dashboard',
    icon: <FcIcons.FcBarChart />,
    cName: 'nav-text',
  },
  {
    title: '가계부',
    path: '/account-book',
    icon: <FcIcons.FcComboChart />,
    cName: 'nav-text',
  },
  {
    title: '수입/지출 내역',
    path: '/transaction',
    icon: <FcIcons.FcLike />,
    cName: 'nav-text',
  },
  {
    title: '카드/계좌',
    path: '/payment-method',
    icon: <FcIcons.FcCurrencyExchange />,
    cName: 'nav-text',
  },
  {
    title: '카테고리',
    path: '/category',
    icon: <FcIcons.FcTodoList />,
    cName: 'nav-text',
  },
  {
    title: '달력',
    path: '/calendar',
    icon: <FcIcons.FcCalendar />,
    cName: 'nav-text',
  },
  {
    title: '보고서',
    path: '/analysis',
    icon: <FcIcons.FcViewDetails />,
    cName: 'nav-text',
  },
  {
    title: '설정',
    path: '/setting',
    icon: <FcIcons.FcSettings />,
    cName: 'nav-text',
  },
];
