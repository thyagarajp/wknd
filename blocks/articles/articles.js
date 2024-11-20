function parseQueryParamsFromString(url) {
    let queryString = "";

    // Extract query string manually
    if (url.includes("?")) {
        queryString = url.split("?")[1].split("#")[0]; // Remove hash if present
    }

    // Parse using URLSearchParams
    const params = new URLSearchParams(queryString);

    // Convert to an object
    const paramObj = {};
    for (const [key, value] of params.entries()) {
        paramObj[key] = value;
    }

    return paramObj;
}
async function displayPopularArticles(data, path) {
    const div = document.createElement("div");
    div.classList.add("card-container");

    const recArticlesDiv = document.querySelector(".recent-articles-query");
    recArticlesDiv.innerHTML = "";
    recArticlesDiv.appendChild(div);
    const queryParams = parseQueryParamsFromString(path);
    let { category = "" } = queryParams;
    console.log("category", category);
    data.forEach((el) => {
        let { description, title, image, path } = el;
        let pathCategory = path.split("/")[1];
        console.log("path., ", pathCategory, pathCategory === category);
        if (pathCategory === category) {
            const div = document.createElement("div");
            div.classList.add("article-card");
            div.innerHTML = `  
            <picture>
                <source media="(max-width:150px)" srcset="${image}">
                <source media="(max-width:165px)" srcset="${image}">
                <img src="${image}" alt="${title}" style="width:280px;">
            </picture> 
            <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">
                <small class="text-muted">${description}</small>
                </p>
            </div>
        `;
            document.querySelector(".card-container").appendChild(div);
        }
    });
}

export async function loadFragment(path, block) {
    if (path && path.startsWith("/")) {
        const resp = await fetch(`${path}`);
        if (resp.ok) {
            let { data } = await resp.json();
            if (data) {
                return displayPopularArticles(data, path);
            }
        }
    }
}

export default async function decorate(block) {
    const link = block.querySelector("a");
    const path = link ? link.getAttribute("href") : block.textContent.trim();
    let fragment = await loadFragment(path);
    let articles = document.getElementsByClassName("recent-articles-query");
    articles.innerHTML = "";
    block.append(articles);
    block.append(fragment);
}
