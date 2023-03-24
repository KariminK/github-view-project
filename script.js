const search = document.querySelector("#search");
const searchBtn = document.querySelector(".searchBtn");
const userlist = document.querySelector(".userslist");
let users = [];
searchBtn.addEventListener('click', ()=>{
    users = search.value.split(',');
    console.log(users);
    createUserElement('assets/github-mark-white', 'costam', 'costam', 'cos');
})

const createUserElement = (profileImgLink, username, bio, createData, linkToProfile)=>{
    let userElLi = document.createElement("li");
    let userElImg = document.createElement("img").classList.add("userImg");
    let userElDetailsDiv = document.createElement("div").classList.add("userdetails");
    let userElusername = document.createElement("p").classList.add("username");
    let userElbio = document.createElement("p").classList.add("bio");
    let userElaccCreateDiv = document.createElement("div").classList.add("accCreated");
    let userElaccP = document.createElement('p');
    let userElaccDate = document.createElement("p");
    userElaccP.innerText = "Konto stworzone w:";
    userElaccDate.innerText = createData;
    userElusername.innerText = username;
    userElbio.innerText = bio;
    userElDetailsDiv.appendChild(userElusername);
    userElDetailsDiv.appendChild(userElbio);
    userElaccCreateDiv.appendChild(userElaccP);
    userElaccCreateDiv.appendChild(userElaccDate);
    userElLi.appendChild(userElImg);
    userElLi.appendChild(userElDetailsDiv);
    userElLi.appendChild(userElaccCreateDiv);
    userlist.appendChild(userElLi);
    console.log(userElLi);
}

// function mainfunc(){
//      users.forEach(async user=>{
//         let userData = await fetch("https://api.github.com/users/"+user);
//      })
// }