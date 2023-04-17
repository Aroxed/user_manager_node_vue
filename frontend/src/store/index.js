import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
    state() {
        return {
            auth: {
                isAuthenticated: false,
                token: null,
            },
            user: {
                id: null,
                email: null,
            },
        };
    },
    mutations: {
        setAuth(state, { isAuthenticated, token }) {
            state.auth.isAuthenticated = isAuthenticated;
            state.auth.token = token;

            if (!isAuthenticated) {
                state.user.id = null;
                state.user.email = null;
            }
        },
        setUser(state, { id, email }) {
            state.user.id = id;
            state.user.email = email;
        },
    },
    actions: {
        async register({ commit }, { email, password }) {
            try {
                await axios.post("http://localhost:3000/register", {
                    email,
                    password,
                });
                return true;
            } catch (err) {
                return false;
            }
        },
        async login({ commit }, { email, password }) {
            try {
                const res = await axios.post("http://localhost:3000/login", {
                    email,
                    password,
                });

                const token = res.data.token;
                const decoded = JSON.parse(atob(token.split(".")[1]));

                commit("setAuth", { isAuthenticated: true, token });
                commit("setUser", { id: decoded.id, email });

                localStorage.setItem("token", token);

                return true;
            } catch (err) {
                return false;
            }
        },
        async logout({ commit }) {

            commit("setAuth", { isAuthenticated: false, token: null });
            localStorage.removeItem("token");
        },
        async fetchProfile({ commit }) {
            try {
                const res = await axios.get("http://localhost:3000/profile", {
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                });

                commit("setUser", { id: res.data.id, email: res.data.email });

                return true;
            } catch (err) {
                commit("setAuth", { isAuthenticated: false, token: null });
                localStorage.removeItem("token");

                return false;
            }
        },
    },
});

export default store;