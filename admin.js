
const ProjectURL = "https://hcxpzqislizvixqxevnv.supabase.co";
const ProjectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeHB6cWlzbGl6dml4cXhldm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzYwNTIsImV4cCI6MjA4MDAxMjA1Mn0.U2hDQtk08WR2fdrLULypb12A-mJEowFF_re_T8sxp80";
const { createClient } = supabase;
const client = createClient(ProjectURL, ProjectKey);

console.log(createClient);

let logoutBtn = document.getElementById('logoutbtn')

logoutBtn && logoutBtn.addEventListener('click' , async () =>{

    const { error } = await client.auth.signOut()

    if(error){
        alert('their is error logging out')
    }
    else{
        Swal.fire({
            title: "Successfully Logged out!\nRedirecting to Signup Page",
            icon: "success",
            draggable: true,
            timer: 2000,
          });
        window.location.href = "index.html"
    }
})


document.getElementById("saveBtn").addEventListener("click", async () => {
    const question = document.getElementById("question").value;
    const op1 = document.getElementById("op1").value;
    const op2 = document.getElementById("op2").value;
    const op3 = document.getElementById("op3").value;
    const op4 = document.getElementById("op4").value;
    const rightAnswer = document.getElementById("rightAnswer").value;
  
    if (!question || !op1 || !op2 || !op3 || !op4 || !rightAnswer) {
      alert("Please fill all fields!");
      return;
    }
  
    const { data, error } = await client
      .from("questions")   // your table name
      .insert([
        {
          question: question,
          option_1: op1,
          option_2: op2,
          option_3: op3,
          option_4: op4,
         Answer: rightAnswer  // <-- new field
        }
      ]);
  
    if (error) {
      console.log(error);
      alert("Error inserting data!");
    } else {
      alert("Question added successfully!");
      
      // Clear fields
      document.getElementById("question").value = "";
      document.getElementById("op1").value = "";
      document.getElementById("op2").value = "";
      document.getElementById("op3").value = "";
      document.getElementById("op4").value = "";
      document.getElementById("rightAnswer").value = ""; // <-- clear new field
    }
  });
  