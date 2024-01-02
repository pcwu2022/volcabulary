import axios from "axios";
import { UserData } from "../types/types";

let userData: UserData = {
    words: []
};

const dataInit = async (username: string) => {
    axios.get(`https://db.pcwu2022.repl.co/volcabulary/${username}`)
        .then((res) => {
            if (res.data.data === null){
                return false // no user present
            } else {
                userData = res.data.data;
                return true // user present
            }
        })
        .catch((err) => console.error(err));
}

const createUser = async(username: string) => {
    let newUser: UserData = {
        words: []
    }
    axios.post(`https://db.pcwu2022.repl.co/volcabulary/${username}`, newUser)
        .catch((err) => console.error(err));
    
}

export {
    dataInit,
    createUser
}