import api from "../api/axios";

export const signUp = (data: {
    name: string;
    email: string;
    password: string;
}) => {
    return api.post("/auth/register", data);
};

export const signIn = (data: {
    email: string;
    password: string;
}) => {
    return api.post("/auth/login", data);
};

