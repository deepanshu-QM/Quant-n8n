

import axios from "axios"

const BASE_URL =
  (import.meta as any)?.env?.VITE_API_URL || "http://localhost:3001";
const TOKEN_KEY = "auth_token";

/*
export const http = axios.create({
    baseURL: BASE_URL,
  });  */

export function setAuthToken(token : string | null) {
    if(token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY)
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

const api = axios.create({
    baseURL : BASE_URL
});

api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if(token){
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config
});




//Returns Types :
export type  IdResponse = {id: string};
export type LoginResponse =  {id : string,  token : string};

export type WorkflowNode = {
    nodeId : string;
    data : {kind: "ACTION" | "TRIGGER"; metadata : any};
    credentials? : any;
    id : string;
    position :{x: number; y : number};
    type: string
};

export type WorkflowEdge = {
    id : string;
    source : string;
    target : string;
}

export type Workflow = {
    _id :string;
    userId : string;
    nodes : WorkflowNode[];
    edges : WorkflowEdge[];
}



//Route Specific Helper :
export async function  apiSignup(body : {username: string; password: string}): Promise<IdResponse> {
  const res = await api.post<IdResponse>("/Signup", body);
  return res.data
}

export async function apiLogin(body: { username: string; password: string }): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/Login", body);
  setAuthToken(res.data.token)
  return res.data;
}

// Workflows
export async function apiCreateWorkflow(body: any): Promise<IdResponse> {
  const res = await api.post<IdResponse>("/create-workflow", body);
  return res.data;
}

export async function apiUpdateWorkflow(workflowId: string, body:any ): Promise<IdResponse> {
  const res = await api.put<IdResponse>(`/create-workflow/${workflowId}`, body);
  return res.data;
}


export async function apiGetWorkflow(workflowId: string): Promise<Workflow> {
  const res = await api.get<Workflow>(`/create-workflow/${workflowId}`);
  return res.data;
}

export async function apiListWorkflows(): Promise<Workflow[]> {
  const res = await api.get<Workflow[]>("/workflow");
  return res.data;
}

export async function apiListWorkflowExecutions(workflowId: string): Promise< any[]> {
  const res = await api.get<any[]>(`/create-workflow/executions/${workflowId}`);
  return res.data;
}

// Nodes
export async function apiListNodes(): Promise<any[]> {
  const res = await api.get<any[]>("/nodes");
  return res.data;
}