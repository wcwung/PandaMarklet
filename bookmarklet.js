(function(){
  var array = [];
  var obj = {};

  var sendData = function(){
    var http = new XMLHttpRequest();
    var url = 'https://httpbin.org/post';
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send( JSON.stringify(obj) );
    alert('Job saved');
  };

  if( window.location.origin === 'https://www.linkedin.com'){
    var descriptions = ['URL', 'Company', 'Job Title', 'Location', 'Day Posted', 'Apply Link', 'Experience', 'Job Function', 'Employment Type', 'Industry', 'Employer Job ID', 'Job ID'];
    array.push( window.location.pathname );
    array.push( $('div.content:eq(0)').find('span:eq(0)').text() );
    array.push( $('h1')[0].innerHTML );
    array.push( $('div.content:eq(0)').find('span:eq(2)').text() );
    array.push( $('div.content:eq(0)').find('.posted').text() );
    array.push( $('#offsite-apply-button').attr('href') );

    var otherDetails = $('.value');
    for( var i = 0; i < otherDetails.length; i++ ){
      array.push(otherDetails[i].innerHTML)
    }

    for( var i = 0; i < descriptions.length; i++ ){
      obj[descriptions[i]] = array[i];
    }

    console.log(obj);
    sendData();
  }

}());