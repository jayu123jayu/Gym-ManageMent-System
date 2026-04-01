
let members = JSON.parse(localStorage.getItem("members")) || [];

function saveToLocal() {
  localStorage.setItem("members", JSON.stringify(members));
}

function addMember() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const expiry = document.getElementById("expiry").value;

  if (!name || !phone || !expiry) {
    alert("Please fill all fields");
    return;
  }

  members.push({ name, phone, expiry });
  saveToLocal();
  displayMembers();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("expiry").value = "";
}

function displayMembers() {
  const table = document.getElementById("memberTable");
  table.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  members.forEach(m => {
    const status = m.expiry >= today ? "Active" : "Expired";

    table.innerHTML += `
      <tr>
        <td>${m.name}</td>
        <td>${m.phone}</td>
        <td>${m.expiry}</td>
        <td class="${status === 'Active' ? 'status-active' : 'status-expired'}">${status}</td>
      </tr>
    `;
  });
}

function markAttendance() {
  const phone = document.getElementById("phoneInput").value;
  const result = document.getElementById("result");

  const member = members.find(m => m.phone === phone);

  if (!member) {
    result.innerHTML = "<p style='color:red;'>Member Not Found ❌</p>";
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  if (member.expiry >= today) {
    result.innerHTML = `<p style='color:green;'>${member.name} ✅ Active<br>Expiry: ${member.expiry}</p>`;
  } else {
    result.innerHTML = `<p style='color:red;'>${member.name} ❌ Expired</p>`;
  }
}

// Load members on page load
