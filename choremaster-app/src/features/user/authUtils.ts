

export const saveTokenInLocalStorage = (token:string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime().toString());
};

export const getTokenFromLocalStorage = () => {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const lastLoginTime = localStorage.getItem("lastLoginTime")
    if(lastLoginTime == null) {
        return null
    }
    const timeSinceLastLogin = now - +lastLoginTime ;
    if (timeSinceLastLogin < timeAllowed) {
        return localStorage.getItem("token");
    }
};

export const deleteTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastLoginTime");
}