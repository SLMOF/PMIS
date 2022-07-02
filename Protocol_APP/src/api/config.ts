import { ENDPIONTS, PagingOptions } from "@api";
import axios, { AxiosRequestConfig } from "axios";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = "https://localhost:7243/api/";
//const BASE_URL = "https://localhost:7192/api/";

export const httpService = <T>(
  endpoint: ENDPIONTS,
  options?: PagingOptions | URLSearchParams
) => {
  const query = options ?? new PagingOptions();

  const formatedQuery =
    query instanceof PagingOptions ? query.format() : query.toString();

  let url = BASE_URL + endpoint;

  // requestInterceptors();
  responseInterceptors();

  const token = JSON.parse(
    localStorage.getItem("token") ?? JSON.stringify("token")
  );
  return {
    getAll: () =>
      axios.get(url + `?${formatedQuery}`, {
        headers: { Authorization: "Bearer " + token },
      }),
    getById: (id: any) =>
      axios.get(url + "/" + id + `?${formatedQuery}`, {
        headers: { Authorization: "Bearer " + token },
      }),
    getBySearch: (newRecord: T) =>
      axios.post(url + "/search", newRecord, {
        headers: { Authorization: "Bearer " + token },
      }),
    post: (newRecord: T) =>
      axios.post(url, newRecord, {
        headers: { Authorization: "Bearer " + token },
      }),
    update: (id: number, updatedRecord: T) =>
      axios.put(url + "/" + id, updatedRecord, {
        headers: { Authorization: "Bearer " + token },
      }),
    delete: (id: number) =>
      axios.delete(url + "/" + id, {
        headers: { Authorization: "Bearer " + token },
      }),
  };
};

const requestInterceptors = () => {
  axios.interceptors.request.use((request: AxiosRequestConfig) => {
    // add auth header with jwt if account is logged in and request is to the api url

    const token = localStorage.getItem("token");
    // const isLoggedIn = token ? true : false; // check local storage and return true if token is there
    // const isApiUrl = request?.url?.startsWith(BASE_URL);

    // console.log('Token is: ', token);
    // console.log('is logged in: ', isLoggedIn);
    // console.log('is API URL: ', isApiUrl);

    // if (isLoggedIn && isApiUrl) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // }

    return request;
  });
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: "The record has been added successfully.",
        });
      }

      return response;
    },
    (error) => {
      const token = localStorage.getItem("token");
      const isLoggedIn = token ? true : false; // check local storage and return true if token is there
      if (error.response.status === 401 && isLoggedIn) {
        //inform user that their session is ended with Swal alert.
        logout();
      }
      if (error.response.status === 400) {
        Swal.fire({
          text: `${error?.response?.data?.message ?? "Please try again."}`,
          showConfirmButton: false,
          icon: "error",
        });
        // window.location.reload();
      }

      return error;
    }
  );
};

export const logout = () => {
  console.log("should be logged out");
  return;
  localStorage.removeItem("token");
  window.location.assign("/auth/login");
  //  redirect them to loging page
  // with removing the token from local storage.
};
