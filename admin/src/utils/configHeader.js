const getTokenLS = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;


export const configLS = {
    headers: {
        Authorization: `Bearer ${getTokenLS.token}`,
        Accept: "application/json"
    }
}