console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  
$( '#koalaTable' ).on( 'click', '.deleteBtn', deleteBtn)
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function deleteBtn() {
    const idToDel = $(this).closest('tr').data('id')
    
    console.log( 'in delete btn on click');
    $.ajax({
      method: 'DELETE',
      url: `/koalas/${idToDel}`
    })
    .then ( function (response) {
        getKoalas()
    })
    .catch (function (error) {
      console.log('Error with deleting koalas', error);
    })
    
  }


function setupClickListeners() {
  $( '#koalaBtn' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
  $('#koalaTable').on('click', '.transferAway', koalaReady)
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response) {
    console.log(response);
    koalaRender(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST', 
    url: '/koalas', 
    data: {
      name: $('#nameInput').val(),
      age: $('#ageInput').val(), 
      gender: $('#genderInput').val(), 
      readyToTransfer: $('#transInput').val(),  
      notes: $('#notesInput').val()
    }}).then(function(response){
      console.log(response);
      getKoalas();
    }).catch(function(response){
      console.log('You got the wrong Koalas, buddy', error);
      alert('Youre not koalified to CATCH these koalas, yet... Try again.')
    });
  }


// PUT 
function koalaReady() {
  let idToUpdate = $(this).closest('tr').data('id');
  console.log(idToUpdate);
  let readyForTransfer = true;

  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      readyForTransfer
    }
  }).then(function(response){
    console.log(response);
    getKoalas();
  }).catch(function(error){
    console.log(error)
  })
};


// Render Koala
function koalaRender(response) {
  $('#koalaTable').empty();

  for (let koala of response) {
    // for each koala, append a new to the table
    // .transferAway
    // .deleteBtn
    $('#koalaTable').append(`
      <tr data-id = ${koala.id}>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button class = "transferAway">Ready to Transfer</button></td>
        <td><button class = "deleteBtn">Delete</button></td>
      </tr>
    `);
  }
}