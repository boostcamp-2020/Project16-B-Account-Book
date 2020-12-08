import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

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

const GlobalStyle = createGlobalStyle`
  body {
    background: #ffffff;
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />

      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/account-book" component={AccountBookPage} />
        <Layout>
          <Route path="/analysis">
            <Route component={AnalysisPage} />
          </Route>

          <Route exact path="/calendar">
            <Route component={CalendarPage} />
          </Route>

          <Route exact path="/category">
            <Route component={CategoryTagPage} />
          </Route>

          <Route path="/dashboard">
            <Route component={DashboardPage} />
          </Route>

          <Route path="/payment-method/:id">
            <Route component={PaymentDetailPage} />
          </Route>

          <Route path="/payment-method">
            <Route component={PaymentMethodPage} />
          </Route>

          <Route path="/setting">
            <Route component={SettingPage} />
          </Route>

          <Route path="/transaction">
            <Route component={TransactionPage} />
          </Route>

          <Route>
            <Route component={NotFoundPage} />
          </Route>
        </Layout>
      </Switch>
    </>
  );
};

export default App;
