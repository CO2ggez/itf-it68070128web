const logOutputDiv = document.getElementById('log-output');
const proceedBtn = document.getElementById('proceed-btn');
const changeBalanceBtn = document.getElementById('change-balance-btn');
const currentAccountBalanceInput = document.getElementById('current-account-balance');
const currentCashBalanceInput = document.getElementById('current-cash-balance');
const operationTypeSelect = document.getElementById('operation-type');
const operationAmountInput = document.getElementById('operation-amount');

let logEntryNumber = 0;

function addLog(message) {
    logEntryNumber++;
    logOutputDiv.innerHTML = `${logEntryNumber}. ${message}<br>` + logOutputDiv.innerHTML;
}

proceedBtn.addEventListener('click', function() {
    const type = operationTypeSelect.value;
    const amount = Number(operationAmountInput.value);
    let currentBalance = Number(currentAccountBalanceInput.value);

    if (amount <= 0) {
        addLog("Error: Amount must be positive.");
        return;
    }
    if (type === 'Withdraw') {
        if (amount > currentBalance) {
            addLog(`Error: Insufficient balance to withdraw ${amount}.`);
        } else {
            currentBalance -= amount;
            addLog(`Successfully withdrew ${amount} from account.`);
        }
    } else if (type === 'Deposit') {
        currentBalance += amount;
        addLog(`Successfully deposited ${amount} to account.`);
    }
    currentAccountBalanceInput.value = currentBalance;
});

changeBalanceBtn.addEventListener('click', function() {
    addLog("Change button clicked (logic to be implemented).");
});

addLog("System initialized. Welcome!");

const convertBtn = document.getElementById('convert-btn');
const inputBalance = document.getElementById('input-balance');
const outputBalance = document.getElementById('output-balance');
const inputCurrency = document.getElementById('input-currency');

const USD_TO_THB_RATE = 32.5;

convertBtn.addEventListener('click', function() {
    const amount = Number(inputBalance.value);
    const currency = inputCurrency.value;
    let result = 0;

    if (amount < 0) {
        addLog("Converter Error: Input balance cannot be negative.");
        return;
    }

    if (currency === 'USD') {
        result = amount * USD_TO_THB_RATE;
        outputBalance.value = `${result.toFixed(2)} THB`;
        addLog(`Converted ${amount} USD to ${result.toFixed(2)} THB.`);
    } else if (currency === 'THB') {
        result = amount / USD_TO_THB_RATE;
        outputBalance.value = `${result.toFixed(2)} USD`;
        addLog(`Converted ${amount} THB to ${result.toFixed(2)} USD.`);
    }
});