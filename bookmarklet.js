(function(){
  var data = [];
  var dataObj = {};
  var site = window.location.origin;
  var pathname = window.location.pathname;

  var fillDataObj = function(){
    for( var i = 0; i < descriptions.length; i++ ){
      dataObj[descriptions[i]] = data[i];
    }
    console.log(dataObj);
  };
  var sendData = function(){
    var http = new XMLHttpRequest();
    var url = 'https://httpbin.org/post';
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send( JSON.stringify(dataObj) );
    alert('Job saved');
  };

  if( site + pathname.slice(0,6) === 'https://www.linkedin.com/jobs2'){
    var descriptions = ['Origin URL','Job URL', 'Company', 'Job Title', 'Location', 'Day Posted', 'Apply Link', 'Experience', 'Job Function', 'Employment Type', 'Industry', 'Employer Job ID', 'Job ID'];
    data.push( site );
    data.push( pathname );
    data.push( $('div.content:eq(0)').find('span:eq(0)').text() );
    data.push( $('h1')[0].innerHTML );
    data.push( $('div.content:eq(0)').find('span:eq(2)').text() );
    data.push( $('div.content:eq(0)').find('.posted').text() );
    data.push( $('#offsite-apply-button').attr('href') );

    var otherDetails = $('.value');
    for( var i = 0; i < otherDetails.length; i++ ){
      data.push(otherDetails[i].innerHTML)
    }

    fillDataObj();
    sendData();
  } else if ( site + pathname.split('/')[2] === 'https://angel.cojobs' ){
    var descriptions = ['Origin URL', 'Job URL', 'Company', 'Job Title', 'Location', 'Skills', 'Salary'];
    var CompanyTitle = $('.join-title').text().split(' at ');

    data.push( site );
    data.push( pathname );
    data.push( CompanyTitle[1] );
    data.push( CompanyTitle[0] );
    data.push( $('.locations').text() );
    data.push( $('.skills').text() );
    data.push( $('.salary').text() );

    fillDataObj();
    sendData(); 
  } else {
    alert('Not a Valid Job Post');
  }

}());