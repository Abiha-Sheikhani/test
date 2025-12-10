const ProjectURL = "https://hcxpzqislizvixqxevnv.supabase.co";
const ProjectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeHB6cWlzbGl6dml4cXhldm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzYwNTIsImV4cCI6MjA4MDAxMjA1Mn0.U2hDQtk08WR2fdrLULypb12A-mJEowFF_re_T8sxp80";
const { createClient } = supabase;
const client = createClient(ProjectURL, ProjectKey);

const userIdEl = document.getElementById("userId");
const userNameEl = document.getElementById("userName");
const userEmailEl = document.getElementById("userEmail");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const logoutBtn = document.getElementById("logoutBtn");
const containerr = document.getElementById('usersBody')

async function loadUser() {


  const { data, error } = await client
    .from("users_list")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
  
    console.error(error);
    return;
  }

else{
  console.log(data);
  data.map((user)=>{
containerr.innerHTML += `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
    `;
  })

}
  
}

// Logout
logoutBtn && logoutBtn.addEventListener("click", async () => {
  const { error } = await client.auth.signOut();
  if (error) {
    alert("Error logging out");
  } else {
    window.location.href = "index.html";
  }
});

loadUser();

