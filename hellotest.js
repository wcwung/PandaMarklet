(function () {
    var jobdata = [];
    var companydata =[];
    var jobObject = {'Company': {}};
    var site = window.location.origin;
    var pathname = window.location.pathname;

    var fillJobObj = function(obj, keys, values){
      for( var i = 0; i < keys.length; i++ ){
        obj[keys[i]] = values[i];
      }
    };

    var sendData = function(){
      var http = new XMLHttpRequest();
      var url = 'https://httpbin.org/post';
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.send( JSON.stringify(jobObject) );
      alert('Job saved');
    };

    if( site + pathname.slice(0,6) === 'https://www.linkedin.com/jobs2'){
      var descriptions = ['Job Title', 'Location', 'Apply Link', 'Source Network'];
      var company = ['Name', 'Day Posted', 'Experience', 'Job Function', 'Employment Type', 'Industry', 'Employer Job ID', 'Job ID'];
      jobdata.push( $('h1')[0].innerHTML );
      jobdata.push( $('div.content:eq(0)').find('span:eq(2)').text() );
      jobdata.push( $('#offsite-apply-button').attr('href') );
      jobdata.push( "LinkedIn" );
      //companyObject 
      companydata.push( $('div.content:eq(0)').find('span:eq(0)').text() );
      companydata.push( $('div.content:eq(0)').find('.posted').text() );
      var otherDetails = $('.value');
      for( var i = 0; i < otherDetails.length; i++ ){
        companydata.push(otherDetails[i].innerHTML)
      }

      fillJobObj(jobObject, descriptions, jobdata);
      fillJobObj(jobObject['Company'], company, companydata);
      console.log(jobObject);
    } else if ( site + pathname.split('/')[2] === 'https://angel.cojobs' ){
      var descriptions = ['Job Title', 'Location', 'Apply Link', 'Source Network'];
      var company = ['Name','Job Function', 'Salary'];
      var CompanyTitle = $('.join-title').text().split(' at ');

      jobdata.push( CompanyTitle[0] );
      jobdata.push( $('.locations').text() );
      jobdata.push( site + pathname );
      jobdata.push( "AngelList" );

      companydata.push( CompanyTitle[1] );
      companydata.push( $('.skills').text() );
      companydata.push( $('.salary').text() );

      fillJobObj(jobObject, descriptions, jobdata);
      fillJobObj(jobObject['Company'], company, companydata);
      console.log(jobObject);
    }

    /* FORM */
    var myCSS, myStyleNode,
        myHTML, myHTMLNode;

    /* add the css */
    myCSS  = '#my_unique_id, #my_unique_id *{font-family:Courier,"Courier New",sans-serif;color:#333;line-height:1.5em;font-size:15px;margin:0;padding:0;text-shadow:none;}';
    myCSS += '#my_unique_id {z-index:10000;position:fixed;top:0;right:10px;background-color:#fff;}';
    myCSS += '#my_unique_id .c {width: 350px;padding:20px; padding-top: 50px; background-color: red}';
    myCSS += '#my_unique_id h1 {font-size:20px; margin-bottom:0.5em;color:#0080C0}';
    myCSS += '#my_unique_id p {margin-bottom:0.5em;}';
    /* then insert it */
    myStyleNode =  document.createElement('style');
    myStyleNode.innerHTML = myCSS;
    document.body.appendChild(myStyleNode);

    /* build the HTML element */
    myHTML  = '<div class="c">';
    myHTML += 'Source Network: <input id="psource" type="text" value="' + (jobObject["Source Network"] || "") + '">';
    myHTML += 'Company: <input id="pcompany" type="text" value="' + (jobObject["Company"]["Name"] || "") + '">';
    myHTML += 'Job Title: <input id="pjobtitle" type="text" value="' + (jobObject["Job Title"] || "") + '">';
    myHTML += 'Location: <input id="plocation" type="text" value="' + (jobObject["Location"] || "") + '">';
    myHTML += 'Experience: <input id="pexperience" type="text" value="' + (jobObject["Company"]["Experience"] || "") + '">';
    myHTML += 'Job Function/Skills: <input id="pjobfunction" type="text" value="' + (jobObject["Company"]["Job Function"] || "") + '">';
    myHTML += 'Employment Type: <input id="pemployment" type="text" value="' + (jobObject["Company"]["Employment Type"] || "") + '">';
    myHTML += 'Industry: <input id="pindustry" type="text" value="' + (jobObject["Company"]["Industry"] || "") + '">';
    myHTML += '<button id="pandabutton">Submit</button>';
    myHTML += '</div>';
    /* and create the node */
    myHTMLNode = document.createElement('div');
    myHTMLNode.id = 'my_unique_id';
    myHTMLNode.innerHTML = myHTML;
    /* injec the node, with the event attached */
    document.body.appendChild(myHTMLNode);

    /* listener/ updata jobObject / POST jobObject */
    var updataJobObj = function(){
      jobObject['Origin URL'] = site;
      jobObject['Job URL'] = pathname;
      jobObject['Source Network'] = document.getElementById('psource').value;    
      jobObject['Job Title'] = document.getElementById('pjobtitle').value;
      jobObject['Location'] = document.getElementById('plocation').value;
      jobObject['Company']['Name'] = document.getElementById('pcompany').value;
      jobObject["Company"]['Experience'] = document.getElementById('pexperience').value;
      jobObject["Company"]['Job Function'] = document.getElementById('pjobfunction').value;
      jobObject["Company"]['Employment Type'] = document.getElementById('pemployment').value;
      jobObject["Company"]['Industry'] = document.getElementById('pindustry').value;

      console.log(jobObject);
      sendData();
    };

    var pandabutton = document.getElementById('pandabutton');
    if (pandabutton.addEventListener) {
      pandabutton.addEventListener('click', updataJobObj, false);
    } else if (el.attachEvent) {
      pandabutton.attachEvent('onclick', updataJobObj);
    }
    
  
}());