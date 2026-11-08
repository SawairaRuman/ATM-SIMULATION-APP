
let pin = 1234;
let balance = 2000;
let transactions = [];
const atmBox = document.querySelector(".box1");
const enterButton = document.querySelector(".box1 button");


atmBox.style.padding = "25px";
atmBox.style.color = "white";

function createElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

enterButton.addEventListener("click", function () {

    atmBox.innerHTML = "";

    const heading = createElement("h2", "Welcome to PayNest ATM");
    const pinLabel = createElement("label", "Enter Your ATM PIN");

    const pinInput = createElement("input", "");
    pinInput.type = "password";
    pinInput.maxLength = 4;
    pinInput.placeholder = "Enter 4 digit PIN";

    const loginButton = createElement("button", "Login");
    const message = createElement("p", "");

    atmBox.appendChild(heading);
    atmBox.appendChild(pinLabel);
    atmBox.appendChild(pinInput);
    atmBox.appendChild(loginButton);
    atmBox.appendChild(message);

    loginButton.addEventListener("click", function () {

        if (Number(pinInput.value) === pin) {

            message.textContent = "Login Successful!";
            message.style.color = "lightgreen";

            setTimeout(showDashboard, 500);

        } else {

            message.textContent = "Incorrect PIN! Try Again.";
            message.style.color = "red";

            pinInput.value = "";
        }
    });
});


function showDashboard() {

    atmBox.innerHTML = "";

    const heading = createElement("h2", "PayNest Dashboard");
    const balanceDisplay = createElement("h3", "");
    const output = createElement("p", "Select Your ATM Service");

    atmBox.appendChild(heading);
    atmBox.appendChild(balanceDisplay);

    function updateBalance() {
        balanceDisplay.textContent =
            "Available Balance: Rs. " + balance;
    }

    updateBalance();


    function createButton(text, callback) {

        const button = createElement("button", text);

        button.addEventListener("click", callback);

        atmBox.appendChild(button);
    }

    createButton("1. Check Balance", function () {

        updateBalance();

        output.textContent =
            "Your Balance is Rs. " + balance;
    });
    createButton("2. Withdraw Amount", function () {

        showAmountInput("withdraw", output, updateBalance);
    });


    createButton("3. Deposit Amount", function () {

        showAmountInput("deposit", output, updateBalance);
    });

        createButton("4. Transaction History", function () {

        output.textContent = "";

        if (transactions.length === 0) {
            output.textContent = "No Transactions Yet";
            return;
        }

        transactions.forEach(function (item) {

            const transaction = createElement("p", item);

            atmBox.appendChild(transaction);
        });
    });


    createButton("5. Logout", function () {

        atmBox.innerHTML = "";

        const message = createElement(
            "h2",
            "Thank You For Using PayNest!"
        );

        const restartButton = createElement(
            "button",
            "Login Again"
        );

        restartButton.addEventListener("click", function () {
            location.reload();
        });

        atmBox.appendChild(message);
        atmBox.appendChild(restartButton);
    });

    atmBox.appendChild(output);
}

function showAmountInput(type, output, updateBalance) {

    const oldForm = document.getElementById("amountForm");

    if (oldForm) {
        oldForm.remove();
    }

    const form = document.createElement("form");
    form.id = "amountForm";

    const input = document.createElement("input");

    input.type = "number";
    input.min = "1";
    input.step = "1";
    input.placeholder = "Enter Amount";
    input.required = true;

    const submitButton = createElement(
        "button",
        type === "withdraw" ? "Withdraw" : "Deposit"
    );

    form.appendChild(input);
    form.appendChild(submitButton);

    atmBox.appendChild(form);

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const amount = Number(input.value);

        if (!Number.isInteger(amount) || amount <= 0) {

            output.textContent = "Enter a valid amount!";
            return;
        }

        if (type === "withdraw") {

            if (amount > balance) {

                output.textContent = "Insufficient Balance!";
                return;
            }

            balance -= amount;

            transactions.push(
                "Withdrawn: Rs. " + amount
            );

            output.textContent =
                "Successfully Withdrawn Rs. " + amount;

        } else {

            balance += amount;

            transactions.push(
                "Deposited: Rs. " + amount
            );

            output.textContent =
                "Successfully Deposited Rs. " + amount;
        }

        updateBalance();

        form.remove();
    });
}
