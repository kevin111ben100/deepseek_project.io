document.addEventListener('DOMContentLoaded', function () {
    const billingTable = document.getElementById('billingTable');
    const addRowBtn = document.getElementById('addRowBtn');
    const generateBillBtn = document.getElementById('generateBillBtn');
    const calculateFinalAmountBtn = document.getElementById('calculateFinalAmountBtn');
    const billNumberInput = document.getElementById('billNumber');
    const rateAmountInput = document.getElementById('rateAmount');
    const discountInput = document.getElementById('discount');
    const finalAmountInput = document.getElementById('finalAmount');

    let billNumber = 1;

    // Function to calculate the total for a row
    function calculateRowTotal(row) {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const total = quantity * price;
        row.querySelector('.total').textContent = total.toFixed(2);
        return total;
    }

    // Function to update the total bill
    function updateTotalBill() {
        let totalBill = 0;
        const rows = billingTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            totalBill += calculateRowTotal(row);
        });
        rateAmountInput.value = totalBill.toFixed(2);
        calculateFinalAmount();
        return totalBill;
    }

    // Function to calculate the final amount after discount
    function calculateFinalAmount() {
        const rateAmount = parseFloat(rateAmountInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;
        const finalAmount = rateAmount - (rateAmount * discount / 100);
        finalAmountInput.value = finalAmount.toFixed(2);
    }

    // Event listener for input changes
    billingTable.addEventListener('input', function (e) {
        if (e.target.classList.contains('quantity') || e.target.classList.contains('price')) {
            updateTotalBill();
        }
    });

    // Event listener for adding a new row
    addRowBtn.addEventListener('click', function () {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="item" placeholder="Item Name"></td>
            <td><input type="number" class="quantity" placeholder="Quantity"></td>
            <td><input type="number" class="price" placeholder="Price"></td>
            <td><span class="total">0.00</span></td>
            <td><button class="removeBtn">Remove</button></td>
        `;
        billingTable.querySelector('tbody').appendChild(newRow);
    });

    // Event listener for removing a row
    billingTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('removeBtn')) {
            e.target.closest('tr').remove();
            updateTotalBill();
        }
    });

    // Event listener for generating a bill
    generateBillBtn.addEventListener('click', function () {
        billNumberInput.value = `BILL-${billNumber++}`;
        updateTotalBill();
    });

    // Event listener for calculating the final amount
    calculateFinalAmountBtn.addEventListener('click', calculateFinalAmount);

    // Initial calculation
    updateTotalBill();
});
