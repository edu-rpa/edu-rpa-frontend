const useAuth = () => {
  const setAuthToken = () => {
    localStorage.setItem('accessToken-edu-rpa', '123456');
  };

  const removeAuthToken = () => {
    localStorage.removeItem('accessToken-edu-rpa');
  };

  return { setAuthToken, removeAuthToken };
};

export default useAuth;
