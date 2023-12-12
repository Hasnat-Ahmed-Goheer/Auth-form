export const initialState = {
    token: "",
    loggedIn: false,
};

export const Reducer = (state, action) => {
    console.log(action);
    switch (action.type) { 
        case "LOGIN":
            localStorage.setItem("token", action.payload);
            return {
                ...state,
                token: action.payload,
                loggedIn: true,
            };
            
        case "LOGOUT":  
            localStorage.removeItem("token");
            return {    
                ...state,
                token: null,
                loggedIn: false,
            };
     }
};