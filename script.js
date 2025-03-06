document.addEventListener('DOMContentLoaded', function () {
    const billingTable = document.getElementById('billingTable');
    const addRowBtn = document.getElementById('addRowBtn');
    const totalBillElement = document.getElementById('totalBill');

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
        totalBillElement.textContent = totalBill.toFixed(2);
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

    // Initial calculation
    updateTotalBill();
});
