const useAuth = () => {
  const setAuthToken = () => {
    localStorage.setItem('accessToken', '123456');
  };

  const removeAuthToken = () => {
    localStorage.removeItem('accessToken');
  };

  return { setAuthToken, removeAuthToken };
};

export default useAuth;
