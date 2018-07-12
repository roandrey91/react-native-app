var jwtDecode = require('jwt-decode');

const parseJwt = (token) => {
    const userInfo = jwtDecode(token);
    console.log(userInfo);
    return userInfo;
}

export default parseJwt;