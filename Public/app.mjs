// --------------------------------------------------

const currentUser = {
  displayName: "Kevin", // placeholder for now
};

let currentStatus = "BUSY";

// --------------------------------------------------

const homeView = document.getElementById("homeView");
const createGroupBtn = document.getElementById("createGroupBtn");
const groupsList = document.getElementById("groupsList");

// --------------------------------------------------

const groupView = document.getElementById("groupView");
const groupTitle = document.getElementById("groupTitle");
const groupInfo = document.getElementById("groupInfo");
const memberList = document.getElementById("memberList");
const freeNowBtn = document.getElementById("freeNowBtn");

// --------------------------------------------------

const createGroupModal = document.getElementById("createGroupModal");
const closeCreateGroupModalBtn = document.getElementById(
  "closeCreateGroupModalBtn"
);
const cancelCreateGroupBtn = document.getElementById("cancelCreateGroupBtn");
const submitCreateGroupBtn = document.getElementById("submitCreateGroupBtn");
const groupNameInput = document.getElementById("groupNameInput");
const createGroupError = document.getElementById("createGroupError");

// --------------------------------------------------

function setError(msg = "") {
  createGroupError.textContent = msg;
}

function openCreateGroupModal() {
  setError("");
  groupNameInput.value = "";
  createGroupModal.showModal();
  setTimeout(() => groupNameInput.focus(), 0);
}

function closeCreateGroupModal() {
  createGroupModal.close();
}

// --------------------------------------------------

function addGroupTab(group) {
  const tab = document.createElement("div");
  tab.className = "group-tab";

  tab.innerHTML = `
    <strong>${group.name}</strong>
    <span>${group.memberCount} member</span>
  `;

  tab.addEventListener("click", () => {
    goToGroupView(group);
  });

  groupsList.prepend(tab);
}

// --------------------------------------------------

function renderMember(name, status) {
  memberList.innerHTML = "";

  const el = document.createElement("div");
  el.className = "member";

  el.innerHTML = `
    <span class="member-name">${name}</span>
    <span class="status-dot ${status === "FREE" ? "green" : "red"}"></span>
  `;

  memberList.appendChild(el);
}

function goToGroupView(group) {
  homeView.style.display = "none";
  groupView.style.display = "grid";

  groupTitle.textContent = group.name;
  groupInfo.textContent = `Group ID: ${group.groupId} • Members: ${group.memberCount}`;

  currentStatus = "BUSY"; // 🔴 reset on enter
  renderMember(currentUser.displayName, currentStatus);
}

// --------------------------------------------------

createGroupBtn.addEventListener("click", openCreateGroupModal);

// --------------------------------------------------

closeCreateGroupModalBtn.addEventListener("click", closeCreateGroupModal);
cancelCreateGroupBtn.addEventListener("click", closeCreateGroupModal);

createGroupModal.addEventListener("click", (e) => {
  if (e.target === createGroupModal) closeCreateGroupModal();
});

groupNameInput.addEventListener("input", () => {
  setError("");
});

groupNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitCreateGroupBtn.click();
});

// --------------------------------------------------

submitCreateGroupBtn.addEventListener("click", async () => {
  const name = groupNameInput.value.trim();

  if (name.length < 2) {
    setError("Group name must be at least 2 characters.");
    return;
  }

  setError("");
  submitCreateGroupBtn.disabled = true;
  submitCreateGroupBtn.textContent = "Creating...";

  try {
    const res = await fetch("/api/v1/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setError(err.error || "Failed to create group.");
      return;
    }

    const group = await res.json();

    addGroupTab(group);
    closeCreateGroupModal();
    goToGroupView(group);
  } catch (err) {
    console.error(err);
    setError("Server error. Try again.");
  } finally {
    submitCreateGroupBtn.disabled = false;
    submitCreateGroupBtn.textContent = "Create";
  }
});

// --------------------------------------------------

freeNowBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/v1/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "FREE_NOW" }),
    });

    if (!res.ok) {
      console.error("Failed to update status");
      return;
    }

    const data = await res.json();

    currentStatus = data.status === "FREE_NOW" ? "FREE" : "BUSY";
    renderMember(currentUser.displayName, currentStatus);
  } catch (err) {
    console.error(err);
  }
});
