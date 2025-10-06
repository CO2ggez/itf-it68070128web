const accountBalanceInput = document.getElementById('current-account-balance');
const cashBalanceInput = document.getElementById('current-cash-balance');
const operationTypeSelect = document.getElementById('operation-type');
const operationAmountInput = document.getElementById('operation-amount');
const proceedBtn = document.getElementById('proceed-btn');
const logOutput = document.getElementById('log-output');

let transactionCounter = 1;

// START: โค้ดใหม่สำหรับปุ่ม Change
const changeBalanceBtn = document.getElementById('change-balance-btn');

changeBalanceBtn.addEventListener('click', function() {
    const newAccountBalance = prompt("Enter new account balance:", accountBalanceInput.value);
    const newCashBalance = prompt("Enter new cash balance:", cashBalanceInput.value);

    // ตรวจสอบว่าผู้ใช้ไม่ได้กด Cancel และใส่ค่าเข้ามา
    if (newAccountBalance !== null && !isNaN(newAccountBalance)) {
        accountBalanceInput.value = parseInt(newAccountBalance);
    }
    if (newCashBalance !== null && !isNaN(newCashBalance)) {
        cashBalanceInput.value = parseInt(newCashBalance);
    }
    logOperation("Balances manually changed.");
});
// END: โค้ดใหม่สำหรับปุ่ม Change

proceedBtn.addEventListener('click', function() {
    let currentAccount = parseInt(accountBalanceInput.value);
    let currentCash = parseInt(cashBalanceInput.value);
    let amount = parseInt(operationAmountInput.value);
    const operation = operationTypeSelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount.');
        return;
    }

    if (operation === 'Withdraw') {
        if (amount > currentAccount) {
            alert('Insufficient funds in your account!');
            logOperation('Withdrawal failed: Insufficient funds.');
        } else {
            currentAccount -= amount;
            currentCash += amount;
            accountBalanceInput.value = currentAccount;
            cashBalanceInput.value = currentCash;
            logOperation(`Successfully withdrew ${amount}.`);
        }
    } else if (operation === 'Deposit') {
        if (amount > currentCash) {
            alert('Insufficient cash to deposit!');
            logOperation('Deposit failed: Insufficient cash.');
        } else {
            currentAccount += amount;
            currentCash -= amount;
            accountBalanceInput.value = currentAccount;
            cashBalanceInput.value = currentCash;
            logOperation(`Successfully deposited ${amount}.`);
        }
    }
});

function logOperation(message) {
    const logEntry = document.createElement('p');
    logEntry.textContent = `#${transactionCounter}: ${message}`;
    logOutput.prepend(logEntry);
    transactionCounter++;
}

const inputBalance = document.getElementById('input-balance');
const outputBalance = document.getElementById('output-balance');
const inputCurrency = document.getElementById('input-currency');
const convertBtn = document.getElementById('convert-btn');

const usdToThbRate = 32.5;

convertBtn.addEventListener('click', function() {
    const balance = parseFloat(inputBalance.value);
    const currency = inputCurrency.value;
    let result = 0;

    if (isNaN(balance)) {
        alert('Please enter a valid number for the input balance.');
        return;
    }

    if (currency === 'USD') {
        result = balance * usdToThbRate;
        outputBalance.value = result.toFixed(2) + " THB";
    } else if (currency === 'THB') {
        result = balance / usdToThbRate;
        outputBalance.value = result.toFixed(2) + " USD";
    }
});