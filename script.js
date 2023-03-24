const search = document.querySelector("#search");
const searchBtn = document.querySelector(".searchBtn");
const userlist = document.querySelector(".userslist");
let users2 = [];
let users = []
searchBtn.addEventListener('click', ()=>{
    users2 = search.value.split(",");
    users2.forEach(el=>{
        users.push(el.trim());
    })
    console.log(users);
    userlist.innerHTML = "";
    mainfunc();
    search.value = "";
})

const createUserElement = (profileImgLink, username, bio, createData, linkToProfile)=>{
    let profileIMG = document.createElement("img");
    profileIMG.classList.add("userImg");
    profileIMG.src = profileImgLink;

    let userDetailsDiv = document.createElement("div");
    userDetailsDiv.classList.add("userdetails");
    let usernameP = document.createElement("p");
    usernameP.innerText = username;
    usernameP.classList.add("username");
    userDetailsDiv.appendChild(usernameP);
    let bioP = document.createElement('p');
    bioP.innerText = bio;
    bioP.classList.add("bio");
    userDetailsDiv.appendChild(bioP);

    let createDateDiv = document.createElement("div");
    createDateDiv.classList.add("accCreated");
    let createDateP1 = document.createElement("p");
    createDateP1.innerText = "Konto utworzone w:";
    createDateDiv.appendChild(createDateP1);
    let createDateP2 = document.createElement("p");
    createDateP2.innerText = createData;
    createDateDiv.appendChild(createDateP2);

    let goToProfileLink = document.createElement("a");
    goToProfileLink.href = linkToProfile;
    goToProfileLink.classList.add("goToProfile");
    let goToProfileIcon = document.createElement("img");
    goToProfileIcon.src = "assets/github-mark-white.png"; 
    goToProfileLink.appendChild(goToProfileIcon);

    let liEl = document.createElement("li");
    liEl.appendChild(profileIMG);
    liEl.appendChild(userDetailsDiv);
    liEl.appendChild(createDateDiv);
    liEl.appendChild(goToProfileLink);
    console.log(liEl);
    userlist.appendChild(liEl);
}
function mainfunc(){
    users.forEach(async user=>{
        let userData = await fetch("https://api.github.com/users/"+user).then(response => response.json());
        console.log(userData);
        createUserElement(userData.avatar_url, userData.name, userData.bio, userData.created_at, userData.html_url);
    })
}