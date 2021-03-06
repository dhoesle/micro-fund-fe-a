import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { LandingPage } from './components/pages/Landing';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import AppCard from './components/pages/Dashboard/AppCard';
import Profile from '../src/components/common/Profile';
import { QueryClient, QueryClientProvider } from 'react-query';
import PartnerAdmins from './components/pages/Partners/PartnerAdmins';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 600000,
      },
    },
  });

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/landing" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/implicit/callback" component={LoginCallback} />
          <Route path="/partnerAdmins" component={PartnerAdmins} />
          {/* Next 4 paths to be secure paths. Delete and re-enable SecureRoute */}
          {/* <Route path="/example-list" component={ExampleListPage} />
          <Route path="/profile-list" component={ProfileListPage} />
          <Route path="/datavis" component={ExampleDataViz} />
          <Route path="/AppCard" component={AppCard} /> */}
          {/* any of the routes you need secured should be registered as SecureRoutes */}

          <SecureRoute
            path="/"
            exact
            component={() => <HomePage LoadingComponent={LoadingComponent} />}
          />

          <SecureRoute path="/example-list" component={ExampleListPage} />
          <SecureRoute path="/profile-list" component={ProfileListPage} />
          <SecureRoute path="/datavis" component={ExampleDataViz} />
          <SecureRoute path="/AppCard" component={AppCard} />
        </Switch>
      </QueryClientProvider>
    </Security>
  );
}
