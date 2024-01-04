import axios from "axios";
import { UserData, UserDataIndex } from "../types/types";

let globalUsername = "";
let userData: UserData = {
    learning1: [],
    learning2: [],
    learning3: [],
    learning4: [],
    learning5: [],
    learnt: [], // learnt through five success trials
    known: [], // known in advance
    discarded: [],
    level: 1,
    count: 0
};

// database
let words: Array<Array<string>> = [];

const dataInit = (username: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axios.get(`https://db.pcwu2022.repl.co/volcabulary/${username}`)
            .then((res) => {
                if (res.data.data === null){
                    resolve(false); // no user present
                } else {
                    userData = res.data.data;
                    globalUsername = username;
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

const createUser = (username: string) => {
    let newUser = userData;
    globalUsername = username;
    axios.post(`https://db.pcwu2022.repl.co/volcabulary/${username}`, newUser)
        .catch((err) => console.error(err));
}

const saveUser = () => {
    axios.post(`https://db.pcwu2022.repl.co/volcabulary/${globalUsername}`, userData)
        .catch((err) => console.error(err));
}

const loadWords = () => {
    for (let level = 1; level <= 12; level++){
        axios.get(`https://db.pcwu2022.repl.co/volcabulary/${level}`)
            .then((response) => {
                words[level] = response.data.data;
            })
            .catch((err) => {
                console.error(err)
            });
    }
}

const stableProb = 0.1;
const initProb = 0.5;
const thresholdCount = 20
const prob = () => {
    return ((userData.count+1) < thresholdCount)?(0-(initProb-stableProb)/thresholdCount)*(userData.count+1)+initProb:stableProb
}

const stableStep = 0.05
const initStep = 1;
const step = () => {
    return ((userData.count+1) < thresholdCount)?(0-(initStep-stableStep)/thresholdCount)*(userData.count+1)+initStep:stableStep
}

const stableReview = 0.3;
const reviewProb = () => {
    let len = userData.learning1.length + userData.learning2.length + userData.learning3.length + userData.learning4.length + userData.learning5.length;
    return ((len < thresholdCount)?len*stableReview/thresholdCount:stableReview)
}

// check if the word is inside userData
const inData = (word: string): boolean => {
    for (let key in userData){
        let searchArray = userData[key as keyof UserData];
        if (typeof searchArray != "number"){
            if (searchArray.indexOf(word) != -1){
                // found word in searchArray
                return true;
            }
        }
    }
    return false;
}

const randomSelect = (array: Array<any>): any => {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

const levelLimit = 12;
const getRandomWord = (): [string ,number | UserDataIndex] => { // get random word according to user info
    // some probability of reviewing
    if (Math.random() < reviewProb()){
        // get word from review
        let len = userData.learning1.length + userData.learning2.length + userData.learning3.length + userData.learning4.length + userData.learning5.length;
        let choice = Math.floor(Math.random() * len);
        if (choice < userData.learning1.length){
            // choose from learning1
            return [userData.learning1[choice], UserDataIndex.learning1];
        } 
        choice -= userData.learning1.length;
        if (choice < userData.learning2.length){
            // choose from learning2
            return [userData.learning2[choice], UserDataIndex.learning2];
        } 
        choice -= userData.learning2.length;
        if (choice < userData.learning3.length){
            // choose from learning3
            return [userData.learning3[choice], UserDataIndex.learning3];
        } 
        choice -= userData.learning3.length;
        if (choice < userData.learning4.length){
            // choose from learning4
            return [userData.learning4[choice], UserDataIndex.learning4];
        } else {
            choice -= userData.learning4.length;
            // choose from learning5
            return [userData.learning5[choice], UserDataIndex.learning5];
        }
    } else {
        let level = Math.floor(userData.level);
        let rand = Math.random();
        // for some probability, it would randomly choose to go up or down a level
        if (rand < prob()/2){
            // + one level
            level = Math.round(userData.level) + 1;
        } else if (rand < prob()){
            // - one level
            level = Math.round(userData.level) - 1;
        } else {
            let delta = level - Math.floor(level); 
            // if level = 7.4, then [7] <-0.6- [7.4] -0.4-> [8]
            rand = Math.random();
            if (rand < delta){
                level = Math.ceil(userData.level);
            } else {
                level = Math.floor(userData.level);
            }
        }

        // boundary conditions
        if (level > levelLimit){
            level = levelLimit;
        } if (level < 1){
            level = 1;
        }

        // pick a random word
        let word = "";
        do {
            word = randomSelect(words[level]);
        } while (inData(word));

        return [word, level];
    }
}

export {
    dataInit,
    createUser,
    loadWords,
    getRandomWord,
    saveUser
}