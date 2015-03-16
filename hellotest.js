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
      var descriptions = ['Company', 'Job Title', 'Location', 'Day Posted', 'Apply Link', 'Experience', 'Job Function', 'Employment Type', 'Industry', 'Employer Job ID', 'Job ID'];
      
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
      var descriptions = ['Company', 'Job Title', 'Location', 'Job Function', 'Salary'];
      var CompanyTitle = $('.join-title').text().split(' at ');

      data.push( CompanyTitle[1] );
      data.push( CompanyTitle[0] );
      data.push( $('.locations').text() );
      data.push( $('.skills').text() );
      data.push( $('.salary').text() );

      fillDataObj();
    }

    /* FORM DATA */
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
    myHTML += 'Company: <input id="pcompany" type="text" value="' + (dataObj["Company"] || "") + '">';
    myHTML += 'Job Title: <input id="pjobtitle" type="text" value="' + (dataObj["Job Title"] || "") + '">';
    myHTML += 'Location: <input id="plocation" type="text" value="' + (dataObj["Location"] || "") + '">';
    myHTML += 'Experience: <input id="pexperience" type="text" value="' + (dataObj["Experience"] || "") + '">';
    myHTML += 'Job Function/Skills: <input id="pjobfunction" type="text" value="' + (dataObj["Job Function"] || "") + '">';
    myHTML += 'Employment Type: <input id="pemployment" type="text" value="' + (dataObj["Employment Type"] || "") + '">';
    myHTML += 'Industry: <input id="pindustry" type="text" value="' + (dataObj["Industry"] || "") + '">';
    myHTML += '<button id="pandabutton">Submit</button>';
    myHTML += '</div>';
    /* and create the node */
    myHTMLNode = document.createElement('div');
    myHTMLNode.id = 'my_unique_id';
    myHTMLNode.innerHTML = myHTML;

    /* add js functionality to it */
    var updataObj = function(){
      dataObj['Origin URL'] = site;
      dataObj['Job URL'] = pathname;
      dataObj['Company'] = document.getElementById('pcompany').value;
      dataObj['Job Title'] = document.getElementById('pjobtitle').value;
      dataObj['Location'] = document.getElementById('plocation').value;
      dataObj['Experience'] = document.getElementById('pexperience').value;
      dataObj['Job Function'] = document.getElementById('pjobfunction').value;
      dataObj['Employment Type'] = document.getElementById('pemployment').value;
      dataObj['Industry'] = document.getElementById('pindustry').value;

      console.log(dataObj);
    };
    /* injec the node, with the event attached */
    document.body.appendChild(myHTMLNode);

    var pandabutton = document.getElementById('pandabutton');
    if (pandabutton.addEventListener) {
      pandabutton.addEventListener('click', updataObj, false);
    } else if (el.attachEvent) {
      pandabutton.attachEvent('onclick', updataObj);
    }
    
  
}());