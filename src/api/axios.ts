import axios from "axios";
import { UserData } from "../types/types";

let userData: UserData = {
    learning: [],
    learnt: [],
    known: []
};

const dataInit = (username: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axios.get(`https://db.pcwu2022.repl.co/volcabulary/${username}`)
            .then((res) => {
                if (res.data.data === null){
                    resolve(false); // no user present
                } else {
                    userData = res.data.data;
                    resolve(true); // user present
                    console.log(userData);
                }
            })
            .catch((err) => {
                console.error(err)
                resolve(false);
            });
    });
}

const createUser = async(username: string) => {
    let newUser: UserData = {
        learning: [],
        learnt: [],
        known: []
    }
    axios.post(`https://db.pcwu2022.repl.co/volcabulary/${username}`, newUser)
        .catch((err) => console.error(err));
    
}

export {
    dataInit,
    createUser
}