
function addReimRow(reim) {
    if(!reim) {
        return;
    }
    const tableContainer = document.getElementById('reim-table-container');
    const tableBody = tableContainer.childNodes[1].childNodes[3];
    tableBody.innerHTML += `
        <tr>
            <td>${reim.reimId}</td>
            <td>${reim.author}</td>
            <td>${reim.amount}</td>
            <td>${reim.dateSubmited}</td>
            <td>${reim.dateResolved}</td>
            <td>${reim.description}</td>
            <td>${reim.resolver}</td>
            <td>${reim.status}</td>
            <td>${reim.type}</td>
        </tr>
    `;
}

function safeAddReimRow(reim) {
    if(!reim) {
        return;
    }
    const tableContainer = document.getElementById('reim-table-container');
    const tableBody = tableContainer.childNodes[1].childNodes[3];
    
    const row = document.createElement('tr');
    tableBody.appendChild(row);
    
    const reimIdData = document.createElement('td');
    reimIdData.innerText = reim.reimId;
    row.appendChild(reimIdData);

    const authorData = document.createElement('td');
    authorData.innerText = reim.author;
    row.appendChild(authorData);

    const amountData = document.createElement('td');
    amountData.innerText = reim.amount;
    row.appendChild(amountData);

    const dateSubmittedData = document.createElement('td');
    dateSubmittedData.innerText = reim.dateSubmitted;
    row.appendChild(dateSubmittedData);

    const dateResolvedData = document.createElement('td');
    dateResolvedData.innerText = reim.dateResolved;
    row.appendChild(dateResolvedData);

    const descriptionData = document.createElement('td');
    descriptionData.innerText = reim.description;
    row.appendChild(descriptionData);

    const resolverData= document.createElement('td');
    resolverData.innerText = reim.resolver;
    row.appendChild(resolverData);

    const statusData = document.createElement('td');
    statusData.innerText = reim.status;
    row.appendChild(statusData);

    const typeData = document.createElement('td');
    typeData.innerText = reim.type;
    row.appendChild(typeData);

               // <td>${reim.author && reim.author.name}</td>
           // <td>${reim.owner ? reim.owner.username : '~'}</td> 

    // const authorData = document.createElement('td');
    // authorData.innerText = reim.author && reim.author.name;
    // row.appendChild(authorData);
}


// function updateCondition(event) {
//     console.log(event);
//     const dropdown = document.getElementById('condition-dropdown');
//     dropdown.innerText = event.target.innerText;
// }

// function updateauthorDropdown(event) {
//     console.log(event);
//     const dropdown = document.getElementById('author-dropdown');
//     dropdown.innerText = event.target.innerText;
// }

// function submitNewreim(event) {
//     event.preventDefault(); // prevent the default functionality causing the page to refresh
//     console.log('adding new reim from form data');
//     const reimName = document.getElementById('reim-name-input').value;
//     const reimValue = document.getElementById('reim-value-input').value;
//     const authorName = document.getElementById('author-dropdown').innerText;
//     const conditionName = document.getElementById('condition-dropdown').innerText;
//     const reim = {
//         name: reimName,
//         value: reimValue,
//         author: {
//             name: authorName
//         },
//         amount: {
//             label: conditionName
//         }
//     };
//     addreimRow(reim); 
// }

// function safeSubmitNewreim(event) {
//     event.preventDefault(); // prevent the default functionality causing the page to refresh
//     console.log('adding new reim from form data');
//     const reimName = document.getElementById('reim-name-input').value;
//     const reimValue = document.getElementById('reim-value-input').value;
//     const authorName = document.getElementById('author-dropdown').innerText;
//     const conditionName = document.getElementById('condition-dropdown').innerText;
//     const reim = {
//         name: reimName,
//         value: reimValue,
//         author: {
//             name: authorName
//         },
//         amount: {
//             label: conditionName
//         }
//     };
//     safeAddreimRow(reim); 
// }


// addReimRow({
//     reimId: '1',
//     author: 'Luis' ,
//     amount:  100,
//     dateSubmited: '7/25/2019',
//     dateResolved: '7/25/2019',
//     description: 'ss',
//     resolver: 'jim',
//     status: 'approved',
//     type: 'beer'

// });

// async function loadData() {
//     const resp = await fetch('http://localhost:8012/reim', {
//         credentials: 'include'
//     });
//     const reims = await resp.json();
//     console.log(reim);
//     reim.forEach(safeAddReimRow);
// }

async function loadData() {
    const resp = await fetch('http://localhost:8012/reim' 
       );
    const reims = await resp.json();
    console.log(reims);
    reims.forEach(safeAddReimRow);
}

loadData();
