import React, { useReducer } from "react";
import { navigate } from "@reach/router";
import Context from "components/common/Context";
import UserReducer from "reducers/UserReducer";

export default ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, []);

  const logout = async () => {
    try {
      // TODO: Send a request to logout the current user
      // await axios.delete(`${process.env.API}/user/logout`)

      await dispatch({ type: "LOGOUT" });
      window.localStorage.removeItem("token");
      // setAuthToken(false)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        dispatch,
        logout
      }}
    >
      {children}
    </Context.Provider>
  );
};
