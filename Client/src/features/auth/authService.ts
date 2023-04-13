import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../Services/mutation/user.mutation";
import { USER, registerUser } from "./authSlice";
import client from "../../Services/apollo";
import { LOGIN_QUERY } from "../../Services/Queries/user.query";
import { toast } from "react-toastify";

const register = async (userData: registerUser) => {
  let data: any = null;

  await client
    .mutate({
      mutation: REGISTER_MUTATION,
      variables: { ...userData },
    })
    .then((res) => {
      if (res.data.register.status === "201") {
        console.log(res);
        let user = res.data.register.user;
        let token = res.data.register.access_token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        data = res.data.register;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

const login = async (userData: { email: string; password: string }) => {
  let data: any = null;

  await client
    .query({
      query: LOGIN_QUERY,
      variables: { ...userData },
    })
    .then((res) => {
      if (res.data.login.status === "201") {
        console.log(res);
        let user = res.data.login.user;
        let token = res.data.login.access_token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        data = res.data.login;
      } else if (res.data.login.status === "402") {
        toast.error("Bad user password");
        throw "Bad user password";
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
