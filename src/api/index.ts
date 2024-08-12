import axios from "axios";


const api = axios.create({
    baseURL: process.env.API_ENDPOINT,
    withCredentials: false,
})


export const searchApi = async (keyword: string) => api.get(`/filings/search/${keyword}/`)
export const filingsApi = async (query: any) => api.post("/filings/query/", {...query})
export const fileApi = async (link: string) => api.get("/filings/filing/", {params: {url: link}})
export const promptApi = async (query: any) => api.post("/filings/prompt/", {...query})