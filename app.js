const ProjectURL = "https://hcxpzqislizvixqxevnv.supabase.co";
const ProjectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeHB6cWlzbGl6dml4cXhldm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzYwNTIsImV4cCI6MjA4MDAxMjA1Mn0.U2hDQtk08WR2fdrLULypb12A-mJEowFF_re_T8sxp80";
const { createClient } = supabase;
const client = createClient(ProjectURL, ProjectKey);

console.log(createClient);

// signup functionalityy

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const btn = document.getElementById("btn");
btn &&
  btn.addEventListener("click", async () => {
    try {
      if (!username.value || !email.value || !password.value) {
        alert("Plaease enter All Fields!");
      } else {
        const { data, error } = await client.auth.signUp({
          email: email.value,
          password: password.value,
          options: {
            data: {
              username: username.value,
            },
          },
        });

        if (data) {
          console.log(data.user.user_metadata);
          userinfo = data.user.user_metadata;
          let { username, email } = userinfo;

          const { error } = await client
            .from("users-data")
            .insert({ name: username, email: email });

          if (error) {
            console.log("USER DATA ERROR", error);
          } else {
            Swal.fire({
              title: "Successfully Signup!\n Redirecting to Login Page",
              icon: "success",
              draggable: true,
              timer: 2000,
            });
          }
        }

        if (data) {
          console.log(data);

          Swal.fire({
            title: "Successfully Signup!\n Redirecting to Login Page",
            icon: "success",
            draggable: true,
            timer: 2000,
          });

          // setTimeout(() => {

          window.location.href = "login.html";
          // }, 2000)
        } else {
          console.log(error, error.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

//loginn functionalityyy

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

loginBtn &&
  loginBtn.addEventListener("click", async () => {
    try {
      if (!loginEmail.value || !loginPassword.value) {
        alert("Plaease enter All Fields!");
      }
      const { data, error } = await client.auth.signInWithPassword({
        email: loginEmail.value,
        password: loginPassword.value,
      });

      if (error) {
        alert("Login failed!");
        console.log(error.message);
      } else {
        console.log(data);

        Swal.fire({
          title: "Successfully Loged in!\n Redirecting to post Page",
          icon: "success",
          draggable: true,
          timer: 2000,
        });

        setTimeout(() => {
          window.location.href = "create.html";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  });

// User dataa

async function getUserData() {
  try {
    const showUserName = document.getElementById("showUserName");
    const { data, error } = await client.auth.getUser();
    console.log(data, "user data");
    showUserName.innerHTML = data.user.user_metadata.username;
    if (error) {
      console.log(error, "GEtting user error", error.message);
    }
  } catch (error) {
    console.log(error, "Error in getting user", error.message);
  }
}

getUserData();
