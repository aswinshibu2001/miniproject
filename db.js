//  import { initializeApp } from 'firebase/app'
// import{
//   collection,
//   getFirestore ,getDocs
// } from 'firebase/firestore'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, addDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWPnKUIkrNpzOrjvgz7av76pf26EuPT2o",
  authDomain: "tech-layoff.firebaseapp.com",
  projectId: "tech-layoff",
  storageBucket: "tech-layoff.appspot.com",
  messagingSenderId: "262332860041",
  appId: "1:262332860041:web:0a61f3f7043e4e0252a858"
};

initializeApp(firebaseConfig)
const db = getFirestore()

const colRef = collection(db,'users')

getDocs(colRef)
.then((snapshot) => {
  let users = []
  snapshot.docs.forEach((doc) =>{
    users.push({ ...doc.data(),id: doc.id})
  })
  console.log(users)
})
.catch(er => {
  console.log(err.message)
})


const addUser = document.querySelector('.contactForm')
addUser.addEventListener('submit', (e) =>{
  e.preventDefault()

addDoc(colRef,{
name: addUser.n.value ,
email: addUser.e.value ,
experience: addUser.ex.value 

})
.then(()=>{
  addUser.reset
})

})