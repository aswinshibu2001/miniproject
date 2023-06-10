import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, limit, query,doc,getDoc, addDoc, getDocs, collection } from 
"https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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


//structuring document into array optional





// adding new document

const addUser = document.querySelector('.row')//contactForm,row g-3
addUser.addEventListener('submit', (e) =>{
  e.preventDefault()

addDoc(colRef,{
name: addUser.n.value ,
email: addUser.e.value ,
company: addUser.c.value ,
sector: addUser.s.value ,
doj: addUser.join.value ,
dor: addUser.resign.value ,
experience: addUser.ex.value 


})
.then(()=>{
  addUser.reset()
  alert("Your response  submitted successfully");
})

})





////////////////////////////test/////////////////////////////
let users = [];         //global variables
let currentIndex = 0;

getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });//creating users array
    });

    console.log(users); //users arrray with all documents

    const targetDiv = document.getElementById("target-div");//reference to target div
    targetDiv.innerHTML = "";

    function fetchDocument(index) {  //function with parameter
      if (index >= users.length) {    //if all docs fetched then start from begining again
        // console.log("All documents fetched");
        currentIndex = 0;
       fetchDocument(currentIndex);// Start fetching documents from the beginning
        return;
      }

      const currentDocument = users[index];
      const docRef = doc(colRef, currentDocument.id);//document reference

      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();

            const rname = document.createElement("p");
            const remail = document.createElement("p");
            const rexperience = document.createElement("p");

            rname.innerHTML = "Name: " + data.name;
            remail.innerHTML = "Email: " + data.email;
            rexperience.innerHTML = "Experience: " + data.experience;

            targetDiv.appendChild(rname);
            targetDiv.appendChild(remail);
            targetDiv.appendChild(rexperience);
            // console.log("currentIndex: " + index);
          } else {
            console.log("Document not found");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }       //function ends here

    const respon = document.querySelector('#submit-button');//next button click,.response
    respon.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex++; // Increment currentIndex in the event listener
      // console.log(users.length);
      fetchDocument(currentIndex); // Fetch the next document
      reset();//resets the target div
    });

    fetchDocument(currentIndex); // Start fetching the documents----initial call of this function
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

function reset() {
  const targetDiv = document.getElementById("target-div");
  targetDiv.innerHTML = ""; // Clear content
}
