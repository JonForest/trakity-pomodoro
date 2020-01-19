import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         getUser() ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

export default function Router() {
  return (
    <Switch>
      {/*<Route path="/login" component={Login} />*/}
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
}
