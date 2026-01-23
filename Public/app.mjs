const createGroupBtn = document.getElementById("createGroupBtn");
const groupsList = document.getElementById("groupsList");

createGroupBtn.addEventListener("click", () => {
  alert("Create Group clicked!");
});

function addGroupTab(group) {
  const tab = document.createElement("div");
  tab.className = "group-tab";

  tab.innerHTML = `
      <strong>${group.name}</strong>
      <span>${group.memberCount} member</span>
    `;

  groupsList.prepend(tab);
}
