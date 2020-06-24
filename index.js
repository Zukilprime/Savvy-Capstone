import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";

const usersColl = db.collection("userNames");

const playerResults = [
  {
    UserName: "Aardvark",
    FirstName: "Celestyna",
    Contact: "Send Message"
  },
  {
    userName: "Dolphin",
    firstName: "August",
    Contact: "Send Message"
  },
  {
    userName: "Gorilla",
    firstName: "Marek",
    Contact: "Send Message"
  },
  {
    userName: "Honeybee",
    firstName: "Emma",
    Contact: "Send Message"
  },
  {
    userName: "Parakeet",
    firstName: "Damian",
    Contact: "Send Message"
  },
  {
    userName: "Scorpion",
    firstName: "Ida",
    Contact: "Send Message"
  },
  {
    userName: "Mongoose",
    firstName: "Piotr",
    Contact: "Send Message"
  },
  {
    userName: "Tortoise",
    firstName: "Mirela",
    Contact: "Send Message"
  },
  {
    userName: "Crow",
    firstName: "Kamilla",
    Contact: "Send Message"
  },
  {
    userName: "Wasp",
    firstName: "Julian",
    Contact: "Send Message"
  },
  {
    userName: "Newt",
    firstName: "Martyna",
    Contact: "Send Message"
  },
  {
    userName: "Bear",
    firstName: "Florentyna",
    Contact: "Send Message"
  },
  {
    userName: "Sparrow",
    firstName: "Adriana",
    Contact: "Send Message"
  },
  {
    userName: "Elephant",
    firstName: "Andrzej",
    Contact: "Send Message"
  },
  {
    userName: "Lynx",
    firstName: "Arnold",
    Contact: "Send Message"
  },
  {
    userName: "Piranha",
    firstName: "Amelia",
    Contact: "Send Message"
  },
  {
    userName: "Wren",
    firstName: "Walter",
    Contact: "Send Message"
  },
  {
    userName: "Porpoise",
    firstName: "Konrad",
    Contact: "Send Message"
  },
  {
    userName: "Cheetah",
    firstName: "Stefan",
    Contact: "Send Message"
  }
];

const scheduleResults = [
  {
    userName: "Aardvark",
    days: "M,W,F",
    timeSlots: "3-6 PM",
    games: "Warhammer 40K, Warhammer Fantasy"
  },
  {
    userName: "Dolphin",
    days: "T,Th",
    timeSlots: "4-8 PM",
    games: "Dungeons and Dragons, Pathfinder"
  }
];

function generatePlayerTableEntry(tablePl, dataPl) {
  let thead = tablePl.createTHead();
  let row = thead.insertRow();
  for (let key of dataPl) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateScheduleTableEntry(tableSc, dataSc) {
  let thead = tableSc.createTHead();
  let row = thead.insertRow();
  for (let key of dataSc) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generatePlayerTable(tablePl, dataPl) {
  for (let element of dataPl) {
    let row = tablePl.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function generateScheduleTable(tableSc, dataSc) {
  for (let element of dataSc) {
    let row = tableSc.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function replaceHeadingsPlayer() {
  let newTableHeadersUser = document.getElementsByTagName("th")[0];
  newTableHeadersUser.innerHTML = "User Name";
  let newTableHeadersFirst = document.getElementsByTagName("th")[1];
  newTableHeadersFirst.innerHTML = "First Name";
  let newTableHeadersContact = document.getElementsByTagName("th")[2];
  newTableHeadersContact.innerHTML = "Contact Me";
}

function replaceHeadingsSchedule() {
  let newTableHeadersUser = document.getElementsByTagName("th")[0];
  newTableHeadersUser.innerHTML = "User Name";
  let newTableHeadersDays = document.getElementsByTagName("th")[1];
  newTableHeadersDays.innerHTML = "Days";
  let newTableHeadersTimeSlots = document.getElementsByTagName("th")[2];
  newTableHeadersTimeSlots.innerHTML = "Time SLots";
  let newTableHeadersGames = document.getElementsByTagName("th")[3];
  newTableHeadersGames.innerHTML = "Preferred Games";
}

const render = (st = state.Home) => {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.links)}
  ${Main(st)}
  ${Footer()}`;
  router.updatePageLinks();
  tableCallPlayer(st);
  tableCallSchedule(st);
  addSiteListeners(st);
};

function addSiteListeners(st) {
  addLogInAndOutListener(state.User);
  listenForAuthChange();
  listenForRegister(st);
  listenForSignIn(st);
}

function addLogInAndOutListener(user) {
  document.querySelector("header a").addEventListener("click", event => {
    if (user.loggedIn) {
      event.preventDefault();
      auth.signOut().then(() => {
        console.log("user logged out");
        logOutUserInDb(user.email);
        resetUserInState();
        db.collection("users").get;
        render(state.Home);
      });
      console.log(state.User);
    }
  });
}

function logOutUserInDb(email) {
  if (state.User.loggedIn) {
    db.collection("users")
      .get()
      .then(snapshot =>
        snapshot.docs.forEach(doc => {
          if (email === doc.data().email) {
            let id = doc.id;
            db.collection("users")
              .doc(id)
              .update({ signedIn: false });
          }
        })
      );
    console.log("user signed out in db");
  }
}

function resetUserInState() {
  state.User.username = "";
  state.User.firstName = "";
  state.User.lastName = "";
  state.User.email = "";
  state.User.loggedIn = false;
}

function listenForAuthChange() {
  auth.onAuthStateChanged(user => (user ? console.log(user) : ""));
}

function listenForRegister(st) {
  if (st.view === "Register") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      let inputList = Array.from(event.target.elements);
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let firstName = inputs[0];
      let lastName = inputs[1];
      let email = inputs[2];
      let password = inputs[3];
      auth.createUserWithEmailAndPassword(email, password).then(response => {
        console.log("user registered");
        console.log(response);
        console.log(response.user);
        addUserToStateAndDb(firstName, lastName, email, password);
        render(state.Home);
      });
    });
  }
}
function addUserToStateAndDb(first, last, email, pass) {
  state.User.username = first + last;
  state.User.firstName = first;
  state.User.lastName = last;
  state.User.email = email;
  state.User.loggedIn = true;

  db.collection("users").add({
    firstName: first,
    lastName: last,
    email: email,
    password: pass,
    signedIn: true
  });
}

function listenForSignIn(st) {
  if (st.view === "Signin") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      let inputList = Array.from(event.target.elements);
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let email = inputs[0];
      let password = inputs[1];
      auth.signInWithEmailAndPassword(email, password).then(() => {
        console.log("user signed in");
        getUserFromDb(email).then(() => render(state.Home));
      });
    });
  }
}
function getUserFromDb(email) {
  return db
    .collection("users")
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        if (email === doc.data().email) {
          let id = doc.id;
          db.collection("users")
            .doc(id)
            .update({ signedIn: true });
          console.log("user signed in in db");
          let user = doc.data();
          state.User.username = user.firstName + user.lastName;
          state.User.firstName = user.firstName;
          state.User.lastName = user.lastName;
          state.User.email = email;
          state.User.loggedIn = true;
          console.log(state.User);
        }
      })
    );
}

function clearSubmittedForm() {
  document.querySelectorAll("input").forEach(input => {
    if (input.type !== "submit") {
      input.value = "";
    }
  });
}

function tableCallPlayer(st) {
  if (st.view === "Player") {
    let tablePl = document.querySelector("table");
    let dataPl = Object.keys(playerResults[0]);
    generatePlayerTable(tablePl, playerResults);
    generatePlayerTableEntry(tablePl, dataPl);
    replaceHeadingsPlayer();
  }
}

function tableCallSchedule(st) {
  if (st.view === "Schedule") {
    let tableSc = document.querySelector("table");
    let dataSc = Object.keys(scheduleResults[0]);
    generateScheduleTable(tableSc, scheduleResults);
    generateScheduleTableEntry(tableSc, dataSc);
    replaceHeadingsSchedule();
  }
}

const router = new Navigo(window.location.origin);

router
  .on({
    ":page": params => {
      render(state[capitalize(params.page)]);
    },
    "/": () => render(state.Home)
  })
  .resolve();
