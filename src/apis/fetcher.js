import axios from "axios";

//Setup axios instance
const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjE4LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMDcyMDAwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzEwODY3NjAwfQ.m06_MDnk8Iecyg24D9-3tgZDQA5I2NK8OBNVISQpnlc",
  },
});

fetcher.interceptors.request.use((request) => {
  //kiểm tra xem user đã đăng nhập hay chưa, để thêm token của user vào headers
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    request.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return request;
});

fetcher.interceptors.response.use(
  (response) => {
    //thay đỏi respone trước khi trả về
    //return response.data.content
    return response;
  },
  (error) => {
    //Kiểm tra nếu lỗi là 401 => token ko hợp lệ => đăng xuất user
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/sign-in");
    }
    return Promise.reject(error);
  }
);

export default fetcher;
