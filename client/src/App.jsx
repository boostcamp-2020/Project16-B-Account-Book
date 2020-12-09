import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { useDispatch } from 'react-redux';

import LoginPage from './pages/LoginPage';
import AccountBookPage from './pages/AccountBookPage';
import AnalysisPage from './pages/AnalysisPage';
import CalendarPage from './pages/CalendarPage';
import CategoryTagPage from './pages/CategoryTagPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PaymentDetailPage from './pages/PaymentDetailPage';
import SettingPage from './pages/SettingPage';
import TransactionPage from './pages/TransactionPage';
import Layout from './components/presentational/common/Layout';

import { setAccessToken } from './slice';
import { getCookie } from '@util/cookie';

const GlobalStyle = createGlobalStyle`
  body {
    background: #ffffff;
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  const cookie = getCookie('accountBookId');
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    dispatch(setAccessToken(accessToken));
  }

  return (
    <>
      <GlobalStyle />
      {!accessToken && <Redirect to="/" />}
      {accessToken && !cookie && <Redirect to="/account-book" />}
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Layout>
          <Switch>
            <Route exact path="/account-book" component={AccountBookPage} />
            <Route exact path="/analysis" component={AnalysisPage} />
            <Route exact path="/calendar" component={CalendarPage} />
            <Route exact path="/category" component={CategoryTagPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route
              exact
              path="/payment-method/:id"
              component={PaymentDetailPage}
            />
            <Route exact path="/payment-method" component={PaymentMethodPage} />
            <Route exact path="/setting" component={SettingPage} />
            <Route exact path="/transaction" component={TransactionPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </Switch>
    </>
  );
};

export default App;
