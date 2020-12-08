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

        <Route path="/analysis">
          <Layout>
            <Route component={AnalysisPage} />
          </Layout>
        </Route>

        <Route exact path="/calendar">
          <Layout>
            <Route component={CalendarPage} />
          </Layout>
        </Route>

        <Route exact path="/category">
          <Layout>
            <Route component={CategoryTagPage} />
          </Layout>
        </Route>

        <Route path="/dashboard">
          <Layout>
            <Route component={DashboardPage} />
          </Layout>
        </Route>

        <Route path="/payment-method/:id">
          <Layout>
            <Route component={PaymentDetailPage} />
          </Layout>
        </Route>

        <Route path="/payment-method">
          <Layout>
            <Route component={PaymentMethodPage} />
          </Layout>
        </Route>

        <Route path="/setting">
          <Layout>
            <Route component={SettingPage} />
          </Layout>
        </Route>

        <Route path="/transaction">
          <Layout>
            <Route component={TransactionPage} />
          </Layout>
        </Route>

        <Route>
          <Layout>
            <Route component={NotFoundPage} />
          </Layout>
        </Route>
      </Switch>
    </>
  );
};

export default App;
