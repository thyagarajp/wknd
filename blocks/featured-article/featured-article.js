import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
    [...block.children].forEach((row) => {
        row.classList.add("featured-article-parent");
        [...row.children].forEach((subRow, i) => {
            subRow.classList.add("featured-article-child-"+i);
        });
    });
    return block;
}
