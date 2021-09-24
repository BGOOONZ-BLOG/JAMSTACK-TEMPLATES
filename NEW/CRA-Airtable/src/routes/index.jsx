import React, { Suspense, useContext, lazy } from "react";
import Context from "components/common/Context";
import ScenesProvider from "providers/UserProvider";
import Theme from "./global-style";
import useFetchUser from "hooks/useFetchUser";
import Spinner from "components/common/Loaders/Spinner";
import Header from "components/theme/Header";

const Authenticated = lazy(() => import("./Authenticated"));
const Unauthenticated = lazy(() => import("./Unauthenticated"));

const App = () => {
  const { user, dispatch, logout } = useContext(Context);
  const { loading, isLoggedIn } = useFetchUser(user, dispatch);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : isLoggedIn ? (
        <Suspense fallback={<Spinner />}>
          <Header isLoggedIn={true} logout={logout} />
          <Authenticated />
        </Suspense>
      ) : (
        <Suspense fallback={<Spinner />}>
          <Header />
          <Unauthenticated />
        </Suspense>
      )}
    </>
  );
};

export default () => (
  <ScenesProvider>
    <Theme />
    <App />
  </ScenesProvider>
);
