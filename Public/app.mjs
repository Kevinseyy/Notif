const createGroupBtn = document.getElementById("createGroupBtn");
const groupsList = document.getElementById("groupsList");

createGroupBtn.addEventListener("click", () => {});

function addGroupTab(group) {
  const tab = document.createElement("div");
  tab.className = "group-tab";

  tab.innerHTML = `
      <strong>${group.name}</strong>
      <span>${group.memberCount} member</span>
    `;

  groupsList.prepend(tab);
}

createGroupBtn.addEventListener("click", async () => {
  const name = prompt("Enter group name:");
  if (!name) return;

  try {
    const res = await fetch("/api/v1/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Failed to create group");
      return;
    }

    const group = await res.json();
    addGroupTab(group);
  } catch (err) {
    console.error(err);
    alert("Server error.");
  }
});
