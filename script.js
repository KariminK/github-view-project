const search = document.querySelector("#search");
const searchBtn = document.querySelector(".searchBtn");
const userlist = document.querySelector(".userslist");
const errorTxt = document.querySelector("#errorMsg");

searchBtn.addEventListener('click', ()=>{
    userlist.innerHTML = "";
    const users = search.value.split(", ");
    mainfunc(users);
    search.value = "";
})

const createUserElement = (profileImgLink, username, bio, createData, linkToProfile)=>{
    const profileIMG = document.createElement("img");
    profileIMG.classList.add("userImg");
    profileIMG.src = profileImgLink;

    const userDetailsDiv = document.createElement("div");
    userDetailsDiv.classList.add("userdetails");
    const usernameP = document.createElement("p");
    usernameP.innerText = username;
    usernameP.classList.add("username");
    userDetailsDiv.appendChild(usernameP);
    const bioP = document.createElement('p');
    bioP.innerText = bio;
    bioP.classList.add("bio");
    userDetailsDiv.appendChild(bioP);

    const createDateDiv = document.createElement("div");
    createDateDiv.classList.add("accCreated");
    const createDateP1 = document.createElement("p");
    createDateP1.innerText = "Konto utworzone w:";
    createDateDiv.appendChild(createDateP1);
    const createDateP2 = document.createElement("p");
    createDateP2.innerText = createData;
    createDateDiv.appendChild(createDateP2);

    const goToProfileLink = document.createElement("a");
    goToProfileLink.href = linkToProfile;
    goToProfileLink.classList.add("goToProfile");
    const goToProfileIcon = document.createElement("img");
    goToProfileIcon.src = "assets/github-mark-white.png"; 
    goToProfileLink.appendChild(goToProfileIcon);

    const liEl = document.createElement("li");
    liEl.appendChild(profileIMG);
    liEl.appendChild(userDetailsDiv);
    liEl.appendChild(createDateDiv);
    liEl.appendChild(goToProfileLink);
    console.log(liEl);
    userlist.appendChild(liEl);
}
async function mainfunc(users){
    console.log(users);
    const usersdata = await Promise.allSettled(users.map(async user=>{
        try{
            let userData = await fetch("https://api.github.com/users/"+user).then(response => response.json());
            if (!userData.name) {
                throw new Error("user not found");
            }
            const {avatar_url, name, bio, created_at, html_url} = userData;
            createUserElement(avatar_url, name, bio, created_at, html_url);
            return userData;
        }catch(error){
            errorTxt.classList.remove("hide");
            errorTxt.innerText = "Nie znaleziono: " + user;
        }
    }))
    console.log(usersdata);
    const usersnotfound = usersdata.filter(e=>{
        e.value == undefined;
    })
    console.log(usersnotfound);
}