export default function decorate(block) {
  // Create a table element
  const table = document.createElement("table");
  table.classList.add("custom-table");

  // Create a table body element
  const tbody = document.createElement("tbody");

  // Fetch and process data from block (assumed data source)
  const rows = block.querySelectorAll("div > div > p");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = row.textContent;
    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  // Append the table body to the table
  table.appendChild(tbody);
  // Clear existing content
  block.innerHTML = "";
  // Append the table to the block
  block.appendChild(table);
}
