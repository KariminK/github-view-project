const search = document.querySelector("#search");
const searchBtn = document.querySelector(".searchBtn");
const userlist = document.querySelector(".userslist");
const errorTxt = document.querySelector("#errorMsg");

searchBtn.addEventListener('click', ()=>{
    userlist.innerHTML = "";
    let users = search.value.split(" ");
    if(search.value != ""){
        errorTxt.classList.add('hide');
        mainfunc(users);
    }else{
        errorTxt.innerText = "Wpisz nazwy użytkowników";
        errorTxt.classList.remove('hide');
    }
    search.value = "";
})

const createUserElement = (profileImgLink, username, bio, createData, linkToProfile, followers, following, twitter_username)=>{
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
    
    const followersDiv = document.createElement("div");
    followersDiv.classList.add("followers");
    const followersP = document.createElement("p");
    const followingP = document.createElement("p");
    followersP.innerText = "Obserwujący: " + followers;
    followingP.innerText = "Obserwuje: " + following;
    followersDiv.appendChild(followersP);
    followersDiv.appendChild(followingP);

    const createDateDiv = document.createElement("div");
    createDateDiv.classList.add("accCreated");
    const createDateP1 = document.createElement("p");
    createDateP1.innerText = "Konto utworzone w:";
    createDateDiv.appendChild(createDateP1);
    const createDateP2 = document.createElement("p");
    createDateP2.innerText = createData;
    createDateDiv.appendChild(createDateP2);
    const btns = document.createElement("div");
    btns.classList.add("btns");

    const goToProfileLink = document.createElement("a");
    goToProfileLink.href = linkToProfile;
    goToProfileLink.classList.add("goToProfile");
    const goToProfileIcon = document.createElement("img");
    goToProfileIcon.src = "assets/github-mark-white.png"; 
    goToProfileLink.appendChild(goToProfileIcon);
    btns.appendChild(goToProfileLink);
    if(twitter_username != null){
        const twitterLink = document.createElement("a");
        twitterLink.classList = "goToProfile twitter";
        const twitterIcon = document.createElement("img");
        twitterIcon.src = "assets/twitter-logo.png";
        twitterLink.appendChild(twitterIcon);
        btns.appendChild(twitterLink);
    }

    const liEl = document.createElement("li");
    liEl.appendChild(profileIMG);
    liEl.appendChild(userDetailsDiv);
    liEl.appendChild(followersDiv);
    liEl.appendChild(createDateDiv);
    liEl.appendChild(btns);
    userlist.appendChild(liEl);
}
async function mainfunc(users){
    const usersdata = await Promise.allSettled(users.map(async user=>{
        let userData = await fetch("https://api.github.com/users/"+user).then(response => response.json());
        console.log(userData);
        if (!userData.name) {
            throw new Error(user);
        }
        const {avatar_url, name, bio, created_at, html_url, followers, following, twitter_username} = userData;
        createUserElement(avatar_url, name, bio, created_at, html_url, followers, following, twitter_username);
        return userData;
    }))
    console.log(usersdata);
    const usersnotfound = usersdata
        .reduce((acc, currentElement)=>{
            if(currentElement.status === 'rejected'){
                return [
                    ...acc,
                    currentElement.reason.message
                ]
            }
            return acc
        }, [])
    if (usersnotfound.length > 0) {
        errorTxt.innerText = "Nie znaleziono: " + usersnotfound;
        errorTxt.classList.remove('hide');
    }
}