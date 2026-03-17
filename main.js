const USERNAME = `butonton`;
let darkTheme = false;

// ================= USER INFO =================
async function getUserInfo() {
    const url = `https://api.github.com/users/${USERNAME}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const user = await response.json();
    console.log(user);

    $(".card").append(`
        <img class="avatar" src="${user.avatar_url}" alt="${user.name}">

        <div class="name">
            <div class="firstName">Matviyiv</div>
            <div class="secondName">Stas</div>
        </div>

        <div class="info">${user.bio ?? "bio not found"}</div>
        <div class="location">${user.location ?? "location not found"}</div>
        <div class="email">${user.email ?? "email not found"}</div>

        <a href="${user.html_url}">
            <button id="goGithub" class="goGithub">
                <i class="fa-brands fa-github"></i>
            </button>
        </a>
    `);
}

getUserInfo();


// ================= REPOS =================
async function fetchRepos() {
    const url = `https://api.github.com/users/${USERNAME}/repos`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const repos = await response.json();
    console.log(repos);

    for (let el of repos) {

        if (el.description === "portfolio") {

            let languages = el.topics.length
                ? el.topics.join(", ")
                : "languages not found";

            $(".projects").append(`
                <div class="item">
                    <div class="previev">${el.name[0]}</div>

                    <div class="projectInfo">
                        <h2 class="nameProject">${el.name}</h2>
                        <div class="languages">${languages}</div>

                        <div class="infoBtnContainer">
                            ${
                                el.homepage
                                ? `<a href="${el.homepage}">
                                     <button class="revievSite">
                                        <i class="fa-solid fa-eye"></i>
                                     </button>
                                   </a>`
                                : ""
                            }

                            <a href="${el.html_url}">
                                <button class="revievInGithub">
                                    <i class="fa-brands fa-github"></i>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            `);
        }
    }
}

fetchRepos();


// ================= UI =================
$(".projectsBtn").click(function () {
    $(".card").removeClass("movesRightCard").addClass("movesLeftCard");
    $(".projectsBtn").css("display", "none");
    $(".projectsContainer").addClass("setProjects");
});

$(".hideProjectsBtn").click(function () {
    $(".card").removeClass("movesLeftCard").addClass("movesRightCard");
    $(".projectsContainer").removeClass("setProjects").addClass("hideProjects");

    setTimeout(() => {
        $(".projectsBtn").css("display", "flex");
    }, 250);
});


// ================= THEME =================
$(".setLightTheme").click(function () {
    $(".setDarkTheme").css("display", "flex");
    $(".setLightTheme").css("display", "none");

    darkTheme = false;
    setTheme();
});

$(".setDarkTheme").click(function () {
    $(".setDarkTheme").css("display", "none");
    $(".setLightTheme").css("display", "flex");

    darkTheme = true;
    setTheme();
});

function setTheme() {
    if (!darkTheme) {
        $(".wrap").css({
            color: "#000",
            backgroundColor: "#fff"
        });
        $("button").css({
            backgroundColor: "#fff",
            color: "#000"
        });
    } else {
        $(".wrap").css({
            color: "#fff",
            backgroundColor: "#000"
        });
        $("button").css({
            backgroundColor: "#000",
            color: "#fff"
        });
    }

    $.cookie("Theme", darkTheme);
}


// ================= INIT =================
darkTheme = $.cookie("Theme") === "true";

if (!darkTheme) {
    $(".setLightTheme").hide();
} else {
    $(".setDarkTheme").hide();
}

setTheme();