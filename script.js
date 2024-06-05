const adminUsername = 'admin';
const adminPassword = 'password';

const userUsername = 'user';
const userPassword = 'userpass';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUsername && password === adminPassword) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
    } else if (username === userUsername && password === userPassword) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('userSection').style.display = 'block';
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'none';
}

function saveCustomerDetails() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;

    localStorage.setItem('customerDetails', JSON.stringify({ name, phone, email }));
    alert('Customer details saved successfully!');
}

function addCloth() {
    const clothesContainer = document.getElementById('clothesContainer');
    const clothItem = document.createElement('div');
    clothItem.classList.add('clothItem');
    clothItem.innerHTML = `
        <select class="clothType">
            <option value="cotton">Cotton</option>
            <option value="silk">Silk</option>
            <option value="woollen">Woollen</option>
            <option value="mixed">Mixed Cotton</option>
        </select>
        <select class="laundryType">
            <option value="cotton care">Cotton Care</option>
            <option value="silk care">Silk Care</option>
            <option value="dry wash">Dry Wash</option>
            <option value="dry clean">Dry Clean</option>
        </select>
        <input type="number" class="cost" placeholder="Cost">
        <input type="date" class="deliveryDate">
    `;
    clothesContainer.appendChild(clothItem);
}

function allocateClothes() {
    const clothItems = document.querySelectorAll('.clothItem');
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    clothItems.forEach(item => {
        const clothType = item.querySelector('.clothType').value;
        const laundryType = item.querySelector('.laundryType').value;
        const cost = item.querySelector('.cost').value;
        const deliveryDate = item.querySelector('.deliveryDate').value;

        const transactionID = 'TX' + Date.now();

        const transaction = {
            transactionID,
            clothType,
            laundryType,
            cost,
            deliveryDate
        };

        transactions.push(transaction);
    });

    localStorage.setItem('transactions', JSON.stringify(transactions));
    alert('Clothes allocated successfully!');
}

function generateReport(period) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let report = '';

    transactions.forEach(transaction => {
        report += `
            <p>Transaction ID: ${transaction.transactionID}</p>
            <p>Cloth Type: ${transaction.clothType}</p>
            <p>Laundry Type: ${transaction.laundryType}</p>
            <p>Cost: ${transaction.cost}</p>
            <p>Delivery Date: ${transaction.deliveryDate}</p>
            <hr>
        `;
    });

    document.getElementById('reportSection').innerHTML = report;
}

function goBack() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'none';
}
