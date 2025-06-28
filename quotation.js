var data = [
    { quantity: 2, description: 'Stock Item Example 0001', unitPrice: 1000 },
    { quantity: 3, description: 'Stock Item Example 0002', unitPrice: 2000 },
    { quantity: 1, description: 'Service Charge Invoicing Item 001', unitPrice: 1000 },
    {
        quantity: 1,
        description: 'Service Charge Invoicing Item 002',
        details: ['Additional line 1 for this item', 'Additional line 2 for this item'],
        unitPrice: 200
    }
];

$(document).ready(function () {
    // Set date
    var d = new Date();
    $('#quotationDate').html(d.toDateString());

    // Calculate subtotal
    var subTotal = 0;
    data.forEach((e) => {
        subTotal += e.unitPrice * e.quantity;
    });
    $('#subTotal').html("" + subTotal);

    // Render existing rows
    var dataRows = data.map((e) => {
        let amount = e.quantity * e.unitPrice;
        return `<tr>
            <td class="data">${e.quantity}</td>
            <td class="data">${e.description}</td>
            <td class="data">${e.unitPrice}</td>
            <td class="data">${amount}</td>
        </tr>`;
    });
    dataRows.forEach((r) => {
        $('#quotationTable tbody').before(r);
    });

    // Add new item on button click
    $('#addItemBtn').on('click', function () {
        const newItem = {
            quantity: 1,
            description: 'New Added Item',
            unitPrice: 500
        };
        data.push(newItem);

        let amount = newItem.quantity * newItem.unitPrice;
        let newRow = `<tr>
            <td class="data">${newItem.quantity}</td>
            <td class="data">${newItem.description}</td>
            <td class="data">${newItem.unitPrice}</td>
            <td class="data">${amount}</td>
        </tr>`;
        $('#quotationTable tbody').before(newRow);

        let newSubTotal = data.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
        $('#subTotal').html("" + newSubTotal);
    });
});