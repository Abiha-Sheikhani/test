const ProjectURL = "https://hcxpzqislizvixqxevnv.supabase.co";
const ProjectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeHB6cWlzbGl6dml4cXhldm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzYwNTIsImV4cCI6MjA4MDAxMjA1Mn0.U2hDQtk08WR2fdrLULypb12A-mJEowFF_re_T8sxp80";
const { createClient } = supabase;
const client = createClient(ProjectURL, ProjectKey);

const userIdEl = document.getElementById("userId");
const userNameEl = document.getElementById("userName");
const userEmailEl = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

async function loadUser() {
  const { data: { user }, error } = await client.auth.getUser();

  if (error || !user) {
    alert("No user logged in. Redirecting to login page.");
    window.location.href = "index.html";
    return;
  }

  userIdEl.innerText = user.id;
  userNameEl.innerText = user.user_metadata?.username || "N/A";
  userEmailEl.innerText = user.email;
}

// Logout
logoutBtn.addEventListener("click", async () => {
  const { error } = await client.auth.signOut();
  if (error) {
    alert("Error logging out");
  } else {
    window.location.href = "index.html";
  }
});

loadUser();
