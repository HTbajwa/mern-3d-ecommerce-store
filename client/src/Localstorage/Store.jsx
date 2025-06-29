const tokenstore = (value) => {
    localStorage.setItem("ecomustoken", value);
};

const gettoken = () => {
    return localStorage.getItem("ecomustoken");
};

const removeToken=()=>{
    localStorage.removeItem("ecomustoken")
}

const recentlystore=(value)=>{
    localStorage.setItem("recently",JSON.stringify(value))
}

const getrecetly=()=>{
    const data=localStorage.getItem("recently")
    return JSON.parse(data)
}

export{tokenstore,gettoken,removeToken,recentlystore,getrecetly}