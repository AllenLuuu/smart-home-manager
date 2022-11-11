import axios from "axios";
import * as R from "ramda";

const request = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export const ping = async () => {
  try {
    const response = await request.get("/ping");
    console.log(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    throw error;
  }
};

const showError = (task: string, errorMessage: string) => {
  window.$toast({
    title: `${task}失败：${errorMessage}`,
    status: "error",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
};

export const post = async (url: string, data: Object, task?: string) => {
  try {
    const response = await request.post(url, data);
    const ret = response.data;
    return R.ifElse(
      R.propEq("errorCode", 0),
      () => ret,
      () => {
        showError(task ?? "上传", ret.errorMessage);
        throw R.pick(["errorCode", "errorMessage"])(ret);
      }
    )(ret);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    throw error;
  }
};
