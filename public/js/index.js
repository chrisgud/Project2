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
  updateBill(bill) {
    return $.ajax({
      method: 'PUT',
      url: '/api/budget',
      data: bill,
    });
  },
};

// refreshBillList gets the updated bill list from the db and repopulates the list
const refreshBillList = () => {
  API.getBills().then((data) => {
    const $bills = data.map((bill) => {
      const $bill = $([
        '<li class=\'list-group-item bill-item\' data-id=\'',
        bill.id,
        '\'>',
        '<span class=\'spanDescription\'>',
        bill.description,
        '</span>: ',
        '<input type =\'text\' class=\'editDescription\' style=\'display: none;\'>',
        '$<span class=\'spanValue\'>',
        bill.value,
        '</span>',
        '<input type =\'text\' class=\'editValue\' style=\'display: none;\'>',
        '<button class=\'delete btn btn-danger float-right\'>ｘ</button>',
        '</li>',
      ].join(''));
      $bill.data('bill', bill);
      return $bill;
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

// deleteButton is called when a bill's delete button is clicked
// Remove the bill from the db and refresh the list
function deleteButton() {
  const idToDelete = $(this)
    .parent()
    .attr('data-id');

  API.deleteBill(idToDelete).then(() => {
    refreshBillList();
  });
}

function editBill() {
  const currentBill = $(this).parent().data('bill');
  $(this).hide();
  if ($(this).hasClass('spanDescription')) {
    $(this).parent().children('input.editDescription').val(currentBill.description);
    $(this).parent().children('input.editDescription').show();
    $(this).parent().children('input.editDescription').focus();
  } else if ($(this).hasClass('spanValue')) {
    $(this).parent().children('input.editValue').val(currentBill.value);
    $(this).parent().children('input.editValue').show();
    $(this).parent().children('input.editValue').focus();
  }
}

function finishEdit(event) {
  const updatedBill = $(this).parent().data('bill');
  if (event.which === 13) {
    if ($(this).hasClass('editDescription')) {
      updatedBill.description = $(this).val().trim();
    } else if ($(this).hasClass('editValue')) {
      updatedBill.value = $(this).val().trim();
    }
    $(this).blur();
    API.updateBill(updatedBill).then(() => {
      refreshBillList();
    });
  }
}

function cancelEdit() {
  const currentBill = $(this).parent().data('bill');
  if (currentBill) {
    $(this).parent().children().hide();
    if ($(this).hasClass('editDescription')) {
      $(this).val(currentBill.description);
    } else if ($(this).hasClass('editValue')) {
      $(this).val(currentBill.value);
    }
    $(this).parent().children('span').show();
    $(this).parent().children('button').show();
  }
}

// Add event listeners
$(document).on('click', 'span', editBill);
$(document).on('keyup', 'input', finishEdit);
$(document).on('blur', 'input', cancelEdit);
$billInput.on('click', handleFormSubmit);
$billList.on('click', '.delete', deleteButton);
refreshBillList();
