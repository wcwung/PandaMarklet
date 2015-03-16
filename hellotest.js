(function () {
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
    } else if ( site + pathname.split('/')[2] === 'https://angel.cojobs' ){
      var descriptions = ['Origin URL', 'Job URL', 'Company', 'Job Title', 'Location', 'Job Function', 'Salary'];
      var CompanyTitle = $('.join-title').text().split(' at ');

      data.push( site );
      data.push( pathname );
      data.push( CompanyTitle[1] );
      data.push( CompanyTitle[0] );
      data.push( $('.locations').text() );
      data.push( $('.skills').text() );
      data.push( $('.salary').text() );

      fillDataObj();
    } else {
      alert('Not a Valid Job Post');
    }


    var myCSS, myStyleNode,
        myHTML, myHTMLNode;

    /* add the css */
    myCSS  = '#my_unique_id, #my_unique_id *{font-family:Courier,"Courier New",sans-serif;color:#333;line-height:1.5em;font-size:15px;margin:0;padding:0;text-shadow:none;}';
    myCSS += '#my_unique_id {z-index:10000;position:fixed;bottom:0;left:300;background-color:#fff;}';
    myCSS += '#my_unique_id .c {padding:20px; background-color: red}';
    myCSS += '#my_unique_id h1 {font-size:20px; margin-bottom:0.5em;color:#0080C0}';
    myCSS += '#my_unique_id p {margin-bottom:0.5em;}';
    /* then insert it */
    myStyleNode =  document.createElement('style');
    myStyleNode.innerHTML = myCSS;
    document.body.appendChild(myStyleNode);

    /* build the HTML element */
    myHTML  = '<div class="c">';
    myHTML += 'Company: <input class="company" type="text" value="' + (dataObj["Company"] || "") + '">';
    myHTML += 'Job Title: <input class="jobtitle" type="text" value="' + (dataObj["Job Title"] || "") + '">';
    myHTML += 'Location: <input class="location" type="text" value="' + (dataObj["Location"] || "") + '">';
    myHTML += 'Experience: <input class="experience" type="text" value="' + (dataObj["Experience"] || "") + '">';
    myHTML += 'Job Function/Skills: <input class="jobfunction" type="text" value="' + (dataObj["Job Function"] || "") + '">';
    myHTML += 'Employment Type: <input class="employment" type="text" value="' + (dataObj["Employment Type"] || "") + '">';
    myHTML += 'Industry: <input class="industry" type="text" value="' + (dataObj["Industry"] || "") + '">';
    myHTML += '<button onClick="console.log("hi")">Submit</button>'
    myHTML += '</div>';
    /* and create the node */
    myHTMLNode = document.createElement('div');
    myHTMLNode.id = 'my_unique_id';
    myHTMLNode.innerHTML = myHTML;

    /* add js functionality to it */

    
    // if (myHTMLNode.addEventListener) {
    //   myHTMLNode.addEventListener('click', sayHello, false);
    // } else if (el.attachEvent) {
    //   myHTMLNode.attachEvent('onclick', sayHello);
    // }
    
    /* injec the node, with the event attached */
    document.body.appendChild(myHTMLNode);
  
}());