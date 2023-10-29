import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';

export const getUserInfo = () => {
  const token = Cookies?.get("accessToken");
  let user;

  // if (token) {
  //   user = jwt_decode(token);
  // }
  const email = user?.email;

  return { email, token };
};
