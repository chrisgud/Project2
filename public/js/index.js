// Reference to create new bill with button
const $newBill = $('#newBill');
const $newAmount = $('#newAmount');
// Reference for the div containing the list of bills from the DB
const $bills = $('.bills');
// Reference for a delete bill option

const $deleteBill = $('#deletebill');
const $enterBill = $('#enter-bill');


// The API object contains methods for each kind of request we'll make
const API = {
  saveExample(example) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json',
      },
      type: 'POST',
      url: 'api/budget',
      data: JSON.stringify(example),
    });
  },
  getExamples() {
    return $.ajax({
      url: 'api/budget',
      type: 'GET',
    });
  },
  deleteExample(id) {
    return $.ajax({
      url: `api/budget/${id}`,
      type: 'DELETE',
    });
  },
};

// refreshExamples gets new examples from the db and repopulates the list
const refreshExamples = () => {
  API.getExamples().then((data) => {
    const $examples = data.map((example) => {
      const $a = $('<a>')
        .text(example.description)
        .attr('href', `/budget/${example.id}`);

      const $b = $('<a>')
        .text(example.value)
        .attr('href', `/budget/${example.id}`);


      const $li = $('<ol>')
        .attr({
          class: 'list-group-item',
          'data-id': example.id,
        })
        .append($a);
      $li.append(':  ');
      $li.append($b);

      // const $button = $('<button>')
      //   .addClass('btn btn-danger float-right delete')
      //   .text('ｘ');

      // $li.append($button);

      return $li;
    });

    $bills.empty();
    $bills.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = (event) => {
  event.preventDefault();

  const example = {
    description: $newBill.val().trim(),
    value: $newAmount.val().trim(),
  };
  if (!(example.description && example.value)) {
    alert('You must enter a bill and an amount!'); //eslint-disable-line
    return;
  }
  API.saveExample(example).then(() => {
    refreshExamples();
  });
  $newBill.val('');
  $newAmount.val('');
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = () => {
  const idToDelete = $(this)
    .parent()
    .attr('data-id');

  API.deleteExample(idToDelete).then(() => {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$enterBill.on('click', handleFormSubmit);
$deleteBill.on('click', '.delete', handleDeleteBtnClick);
refreshExamples();
