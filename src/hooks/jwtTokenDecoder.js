import jwt_decode from "jwt-decode";
const jwtTokenDecoder = async(token) => {
 return await jwt_decode(token);

};

export default jwtTokenDecoder;