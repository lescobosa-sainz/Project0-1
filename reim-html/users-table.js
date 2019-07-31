
function safeaddUserRow(user) {
    if(!user) {
        return;
    }
    const tableContainer = document.getElementById('user-table-container');
    const tableBody = tableContainer.childNodes[1].childNodes[3];
    
    const row = document.createElement('tr');
    tableBody.appendChild(row);
    
    const idData = document.createElement('td');
    idData.innerText = user.id;
    row.appendChild(idData);

    const usernameData = document.createElement('td');
    usernameData.innerText = user.username;
    row.appendChild(usernameData);

    const conditionData = document.createElement('td');
    conditionData.innerText = user.password;
    row.appendChild(conditionData);

    const emailData = document.createElement('td');
    emailData.innerText = user.email;
    row.appendChild(emailData);

    const firstNameData = document.createElement('td');
    firstNameData.innerText = user.firstName;
    row.appendChild(firstNameData);

    const lastNameData = document.createElement('td');
    lastNameData.innerText = user.lastName;
    row.appendChild(lastNameData);

    const phoneData = document.createElement('td');
    phoneData.innerText = user.phone;
    row.appendChild(phoneData);

    const roleIDData = document.createElement('td');
    roleIDData.innerText = user.roleID && user.roleID.role;
    row.appendChild(roleIDData);


}

// async function loadData() {
//     const resp = await fetch('http://localhost:8012/users', {
//          credentials: 'include'
//     });
//     console.log('yes');
//     const users = await resp.json();
//     console.log(users);
//     users.forEach(safeaddUserRow);
// }



async function loadData() {
   
    const resp = await fetch('http://localhost:8012/users');
   
    const users = await resp.json();
    console.log(users);
    users.forEach(safeaddUserRow);
}

loadData();
