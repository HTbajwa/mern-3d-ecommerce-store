const tokenstore = (value) => {
    localStorage.setItem("token", value.token); 
    localStorage.setItem("info", JSON.stringify(value)); 
    console.log("Storing token:", value.token); // Debugging// Store only the token string
}

const sohstore = (value) => {
    localStorage.setItem("soh", JSON.stringify(value)); // Store soh as JSON
}

const getsoh = () => {
    let data = localStorage.getItem("soh");
    return data ? JSON.parse(data) : null; // Ensure parsed JSON output
}

const gettoken = () => {
    const token = localStorage.getItem("token");

    console.log("Retrieved token:", token); // Debugging
    return token;// Return token as a string
}
const getinfo = () => {
    const info = localStorage.getItem("info");  // Retrieve the user info string
    console.log("Retrieved data from localStorage:", info);  // Debugging
    return info ? JSON.parse(info).user : null;  // Access the 'user' object inside the stored data
};

const privateurl = (value) => {
    localStorage.setItem("privatetoken", JSON.stringify(value)); // Store as JSON
}

const getprivateurl = () => {
    let data = localStorage.getItem("privatetoken");
    return data ; // Ensure parsed JSON output
}

const removeToken = () => {
    localStorage.removeItem("token");
}




export { privateurl, getprivateurl, getsoh, gettoken, sohstore, tokenstore, removeToken,getinfo };
