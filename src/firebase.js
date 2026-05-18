import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBTdoxeJEy65TphQm3wS-Mvsxq2g5MirdE",
    authDomain: "ai-study-planner-fd539.firebaseapp.com",
    projectId: "ai-study-planner-fd539",
    storageBucket: "ai-study-planner-fd539.firebasestorage.app",
    messagingSenderId: "785255503869",
    appId: "1:785255503869:web:d72a45d8760802cf57eb94"
}

const app = initializeApp(firebaseConfig)

export default app