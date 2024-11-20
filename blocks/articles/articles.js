import { decorateMain } from "../../scripts/scripts.js";

import { loadSections } from "../../scripts/aem.js";

async function displayPopularArticles(data) {
    const div = document.createElement("div");
    div.classList.add("card-container");

    const recArticlesDiv = document.querySelector(".recent-articles-query");
    recArticlesDiv.innerHTML = "";
    recArticlesDiv.appendChild(div);
    data.forEach((el) => {
        let { description, title, image } = el;
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
    });
}

export async function loadFragment(path, block) {
    if (path && path.startsWith("/")) {
        const resp = await fetch(`${path}`);
        if (resp.ok) {
            let { data } = await resp.json();
            if (data) {
                return displayPopularArticles(data);
            }
        }
    }
}

export default async function decorate(block) {
    const link = block.querySelector("a");
    const path = link ? link.getAttribute("href") : block.textContent.trim();
    let fragment = loadFragment(path);
    let articles = document.getElementsByClassName("recent-articles-query");
    articles.innerHTML = "";
    block.append(articles);
    block.appendChild(fragment);
}
