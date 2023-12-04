  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { 
    getFirestore, 
    collection, 
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { 
  getAuth,
  onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAnCt6lyaFvXFt_Cy0x7bn7uqJgC3DPhpY",
    authDomain: "mealplanner-84727.firebaseapp.com",
    projectId: "mealplanner-84727",
    storageBucket: "mealplanner-84727.appspot.com",
    messagingSenderId: "658872106757",
    appId: "1:658872106757:web:386b2caa65d37e086b016c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);


  async function getMeals(db) {
    const mealsCol = collection(db, "meals");
    const mealSnapshot = await getDocs(mealsCol);
    const mealList = mealSnapshot.docs.map((doc) => doc);
    return mealList;
  }

  //lets you see data offline from cache, 
  //can still navigate through application
enableIndexedDbPersistence(db)
    .catch ((err) => {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistance can only be enabled
        // In one tab at a time.
        console.log("Persistence failed")
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log("Persistence is not valid")
      }
    });

const unsub = onSnapshot(collection(db, "meals"), (doc) => {
    //console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
    //console.log(change, change.doc.data(), change.doc.id);
    if(change.type === "added"){
        //call render function in UI
        renderMeal(change.doc.data(), change.doc.id);
    }
    if(change.type === "removed"){
        //do something
        removeMeal(change.doc.id);
    }
    });
});

//add new meal
/*const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

addDoc(collection(db, "meals"), {
  title: form.title.value,
  description: form.description.value
  }).catch((error) => console.log(error));
  form.title.value = "";
  form.description.value = "";
});*/


//delete a meal
const mealContainer = document.querySelector(".meals");
mealContainer.addEventListener("click", (event) => {
//console.log(event);
if (event.target.tagName === "I") {
  const id = event.target.getAttribute("data-id");
  deleteDoc(doc(db, "meals", id));
}
});

  //listen for auth status changes
  onAuthStateChanged(auth, (user) => {
    if(user) {
      console.log("Logged in: ", user.email);
      getMeals(db).then((snapshot) => {
        setupMeals(snapshot);
      });
      setupUI(user);
      const form = document.querySelector("form");
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        addDoc(collection(db, "meals"), {
          title: form.title.value,
          description: form.description.value,
        }).catch((error) => console.log(error));
        form.title.value = "";
        form.description.value = "";
      });
    } else {
        console.log("Logged out");
        setupUI();
        setupMeals([]);
    }
  });