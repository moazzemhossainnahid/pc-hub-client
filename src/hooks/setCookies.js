import Cookies from "js-cookie";
 const setCookies = async (token) => {
  Cookies.set("accessToken", token, { expires: 7 });
};

export default setCookies