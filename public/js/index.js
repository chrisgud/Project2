// References to create new bill with button
const $newBill = $('#newBill');
const $newAmount = $('#newAmount');
const $billInput = $('#billInput');

// Reference for the div containing the list of bills from the DB
const $billList = $('#billList');

// The API object contains methods for each kind of request
const API = {
  saveBill(bill) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json',
      },
      type: 'POST',
      url: 'api/budget',
      data: JSON.stringify(bill),
    });
  },
  getBills() {
    return $.ajax({
      url: 'api/budget',
      type: 'GET',
    });
  },
  deleteBill(id) {
    return $.ajax({
      url: `api/budget/${id}`,
      type: 'DELETE',
    });
  },
};

// refreshBillList gets the updated bill list from the db and repopulates the list
const refreshBillList = () => {
  API.getBills().then((data) => {
    const $bills = data.map((bill) => {
      const $a = $('<a>')
        .text(bill.description)
        .attr('href', `/budget/${bill.id}`);

      const $b = $('<a>')
        .text(bill.value)
        .attr('href', `/budget/${bill.id}`);

      const $li = $('<ol>')
        .attr({
          class: 'list-group-item',
          'data-id': bill.id,
        })
        .append($a);
      $li.append(':  ');
      $li.append($b);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $billList.empty();
    $billList.append($bills);
  });
};

// handleFormSubmit is called whenever we submit a new bill
// Save the new bill to the db and refresh the list
const handleFormSubmit = (event) => {
  event.preventDefault();

  const bill = {
    description: $newBill.val().trim(),
    value: $newAmount.val().trim(),
  };
  if (!(bill.description && bill.value)) {
    alert('You must enter a bill and an amount!'); //eslint-disable-line
    return;
  }
  API.saveBill(bill).then(() => {
    refreshBillList();
  });
  $newBill.val('');
  $newAmount.val('');
};

// handleDeleteBtnClick is called when a bill's delete button is clicked
// Remove the bill from the db and refresh the list
const handleDeleteBtnClick = function deleteButton() {
  const idToDelete = $(this)
    .parent()
    .attr('data-id');

  API.deleteBill(idToDelete).then(() => {
    refreshBillList();
  });
};

// Add event listeners to the submit and delete buttons
$billInput.on('click', handleFormSubmit);
$billList.on('click', '.delete', handleDeleteBtnClick);
refreshBillList();
