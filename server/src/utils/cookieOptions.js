module.exports = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false, ///set true in production (HTTPS)
  path: '/',
  // maxAge: 7 * 24 * 60  * 60 * 1000  // 7 days in ms (aligns with REFRESH_TOKEN_EXPIRES_IN)
  maxAge: 10 * 60 * 1000,
};
