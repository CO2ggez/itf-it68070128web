// --- ส่วนดึง Element (เหมือนเดิม) ---
const logOutputDiv = document.getElementById('log-output');
const proceedBtn = document.getElementById('proceed-btn');
const changeBalanceBtn = document.getElementById('change-balance-btn');
const currentAccountBalanceInput = document.getElementById('current-account-balance');
const currentCashBalanceInput = document.getElementById('current-cash-balance');
const operationTypeSelect = document.getElementById('operation-type');
const operationAmountInput = document.getElementById('operation-amount');
const convertBtn = document.getElementById('convert-btn');
const inputBalance = document.getElementById('input-balance');
const outputBalance = document.getElementById('output-balance');
const inputCurrency = document.getElementById('input-currency');


let logEntryNumber = 0;
let isEditMode = false;
const USD_TO_THB_RATE = 32.5;

function addLog(message) {
    logEntryNumber++;
    logOutputDiv.innerHTML = `${logEntryNumber}. ${message}<br>` + logOutputDiv.innerHTML;
}


changeBalanceBtn.addEventListener('click', function() {
    isEditMode = !isEditMode; // สลับค่า true/false

    if (isEditMode) {

        currentAccountBalanceInput.readOnly = false;
        currentCashBalanceInput.readOnly = false;
        changeBalanceBtn.textContent = 'Save';
        changeBalanceBtn.style.backgroundColor = '#28a745';
        addLog("Balance editing enabled.");
    } else {

        currentAccountBalanceInput.readOnly = true;
        currentCashBalanceInput.readOnly = true;
        changeBalanceBtn.textContent = 'Change';
        changeBalanceBtn.style.backgroundColor = '#007bff';
        addLog("Balance changes saved.");
    }
});


proceedBtn.addEventListener('click', function() {
    const type = operationTypeSelect.value;
    const amount = Number(operationAmountInput.value);
    let accountBalance = Number(currentAccountBalanceInput.value);
    let cashBalance = Number(currentCashBalanceInput.value);

    if (amount <= 0) {
        addLog("Error: Amount must be positive.");
        return;
    }

    if (type === 'Withdraw') {
        if (amount > accountBalance) {
            addLog(`Error: Insufficient balance to withdraw ${amount}.`);
        } else {
            accountBalance -= amount;
            cashBalance += amount;
            addLog(`Successfully withdrew ${amount} from account to cash.`);
        }
    } else if (type === 'Deposit') {
        if (amount > cashBalance) {
            addLog(`Error: Insufficient cash to deposit ${amount}.`);
        } else {
            cashBalance -= amount;
            accountBalance += amount;
            addLog(`Successfully deposited ${amount} from cash to account.`);
        }
    }

    currentAccountBalanceInput.value = accountBalance;
    currentCashBalanceInput.value = cashBalance;
});


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

addLog("System initialized. Welcome!");