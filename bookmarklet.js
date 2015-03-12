(function(){
  var array = [];
  var obj = {};
  var site = window.location.origin;
  var pathname = window.location.pathname;

  var sendData = function(){
    var http = new XMLHttpRequest();
    var url = 'https://httpbin.org/post';
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send( JSON.stringify(obj) );
    alert('Job saved');
  };

  if( site + pathname.slice(0,6) === 'https://www.linkedin.com/jobs2'){
    var descriptions = ['Origin URL','Job URL', 'Company', 'Job Title', 'Location', 'Day Posted', 'Apply Link', 'Experience', 'Job Function', 'Employment Type', 'Industry', 'Employer Job ID', 'Job ID'];
    array.push( site );
    array.push( pathname );
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
  } else if ( site + pathname.split('/')[2] === 'https://angel.cojobs' ){
    var descriptions = ['Origin URL', 'Job URL', 'Company', 'Job Title', 'Location', 'Skills', 'Salary'];
    var CompanyTitle = $('.join-title').text().split(' at ');

    array.push( site );
    array.push( pathname );
    array.push( CompanyTitle[1] );
    array.push( CompanyTitle[0] );
    array.push( $('.locations').text() );
    array.push( $('.skills').text() );
    array.push( $('.salary').text() );

    for( var i = 0; i < descriptions.length; i++ ){
      obj[descriptions[i]] = array[i];
    }

    console.log(obj);
    sendData(); 
  } else {
    alert('Not a Valid Job Post');
  }

}());