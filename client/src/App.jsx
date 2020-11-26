import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/presentational/navbar/Navbar';

import LoginPage from './pages/LoginPage';
import AccountBookPage from './pages/AccountBookPage';
import AnalysisPage from './pages/AnalysisPage';
import CalendarPage from './pages/CalendarPage';
import CategoryPage from './pages/CategoryPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import SettingPage from './pages/SettingPage';
import TransactionPage from './pages/TransactionPage';

const App = () => {
  return (
    <>
      <Navbar />
      <div>Hello React</div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/account-book" component={AccountBookPage} />
        <Route path="/analysis" component={AnalysisPage} />
        <Route exact path="/calendar" component={CalendarPage} />
        <Route path="/category" component={CategoryPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/payment-method" component={PaymentMethodPage} />
        <Route path="/setting" component={SettingPage} />
        <Route path="/transaction" component={TransactionPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;
