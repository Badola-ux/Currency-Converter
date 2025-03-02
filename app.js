const apiKey = "YOUR_API_KEY"; // Replace with a valid API key
const apiUrl = "https://api.exchangerate-api.com/v4/latest/";

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const exchangeMsg = document.getElementById("exchange-rate");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");

// Populate dropdowns with all currencies
function populateCurrencyOptions() {
    Object.keys(countryList).forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.innerText = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.innerText = currency;
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
}

function updateFlags() {
    fromFlag.src = `https://flagsapi.com/${countryList[fromCurrency.value]}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${countryList[toCurrency.value]}/flat/64.png`;
}

async function fetchExchangeRate() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        exchangeMsg.innerText = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);

        exchangeMsg.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        exchangeMsg.innerText = "Error fetching exchange rate.";
    }
}

document.getElementById("currency-form").addEventListener("submit", (event) => {
    event.preventDefault();
    fetchExchangeRate();
});

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

populateCurrencyOptions();
updateFlags();
