const fetch = require("node-fetch");

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: {
    Accept?: string;
    "Content-Type"?: string;
    Authorization?: string;
    "User-Agent"?: string;
    "Cache-Control"?: string;
    Origin?: string;
  };
};

const useFetch = async (url: string, options?: Options) => {
  const response = await fetch(url, options);

  const data = await response.json();

  if (response.statusText !== "OK") throw new Error(data?.error);

  return data;
};

export default useFetch;
