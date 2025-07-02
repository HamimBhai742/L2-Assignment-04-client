import axios from 'axios';
const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return axiosPublic;
};
export default useAxiosPublic;
