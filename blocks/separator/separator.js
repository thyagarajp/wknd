import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
    const hr = document.createElement("hr");
    hr.classList.add("separator-row");
    block.appendChild(hr);
    return block;
}
