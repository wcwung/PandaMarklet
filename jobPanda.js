(function () {
    var getAuth = function(callback){
      var http = new XMLHttpRequest();
      http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
          callback(JSON.parse(http.responseText)); // success
        }
      }; 
      var url = 'https://httpbin.org/get';
      http.open('GET', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.send();
    };

    var isAuthenticated = function(resp) {
      if (true) { //resp.isAuthenticated - server sends back an object with this key with a boolean value.
        showBookMarklet();
      } else { // opens new page to website to login.
        var anchorTag = document.createElement('a');
        anchorTag.setAttribute('href', 'http://jobpanda.herokuapp.com/');
        anchorTag.setAttribute('target', '_blank');
        document.body.appendChild(anchorTag);
        anchorTag.click();
      }
    };

    getAuth(isAuthenticated);
}());

var showBookMarklet = function() {
    var jobdata = [];
    var companydata =[];
    var jobObject = {'company': {}};
    var site = window.location.origin;
    var pathname = window.location.pathname;

    var fillJobObj = function(obj, keys, values){
      for( var i = 0; i < keys.length; i++ ){
        obj[keys[i]] = values[i];
      }
    };

    var sendData = function(){
      var http = new XMLHttpRequest();
      // var url = 'https://jpanda.herokuapp.com/api/listings';
      var url = 'localhost:8000/api/listings'
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.send( JSON.stringify(jobObject) );
      alert('Job saved');
    };

/* SCRAPING DATA */
    if( site + pathname.slice(0,6) === 'https://www.linkedin.com/jobs2'){
      var descriptions = ['jobTitle', 'location', 'applyLink', 'sourceNetwork'];
      var company = ['name', 'dayPosted', 'experience', 'jobFunction', 'employmentType', 'industry', 'employerJobId', 'jobID'];
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
      fillJobObj(jobObject['company'], company, companydata);
      console.log(jobObject);
    } else if ( site + pathname.split('/')[2] === 'https://angel.cojobs' ){
      var descriptions = ['jobTitle', 'location', 'applyLink', 'sourceNetwork'];
      var company = ['name','jobFunction', 'salary'];
      var CompanyTitle = $('.join-title').text().split(' at ');

      jobdata.push( CompanyTitle[0] );
      jobdata.push( $('.locations').text() );
      jobdata.push( site + pathname );
      jobdata.push( "AngelList" );

      companydata.push( CompanyTitle[1] );
      companydata.push( $('.skills').text() );
      companydata.push( $('.salary').text().split('\n').slice(1,4).join('') );

      fillJobObj(jobObject, descriptions, jobdata);
      fillJobObj(jobObject['company'], company, companydata);
      console.log(jobObject);
    }

/* THE FORM (CSS, HTML, BUTTON LISTENER) */
    var myCSS, myStyleNode,
        myHTML, myHTMLNode;

    /* add the css */
    myCSS += '#my_unique_id, #my_unique_id *{color:#fff;line-height:0;font-size:15px;text-shadow:none;}';
    myCSS += '#my_unique_id {z-index:10000;position:fixed;top:0;right:0px;background-color:#fff;}';
    myCSS += '#my_unique_id input {background: transparent;border: none;border-bottom: 1px solid #eee;outline:none;height: 1.5rem;width: 100%;margin: 10px 0 30px 0;color: #000;font-size: 16px;}';

    myCSS += '#my_unique_id, #my_unique_id * {color: #000;line-height: 0;font-size: 10px;text-shadow: none;}';

    myCSS += '.drawer {min-height: 900px;height: 100%;width: 250px;background: #FAFAFA;box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);font-family: "Roboto", sans-serif;color: #105F4B;padding: 30px 20px 20px 20px;}'

    myCSS += 'button#pandabutton {width: 100%;border: none;border-radius: 2px;position: relative;transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);transition-delay: 0.2s;box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);padding: 20px;width: 50%;color: #fff;background: #E33B2E;text-transform: uppercase; cursor:pointer}'

    /* then insert it */ 
    myStyleNode =  document.createElement('style');
    myStyleNode.innerHTML = myCSS;
    document.body.appendChild(myStyleNode);

    /* build the HTML element */
    myHTML = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,300,500,100">'
    myHTML += '<div class="drawer">';
    myHTML += 'Source Network: <br><input id="psource" type="text" value="' + (jobObject["sourceNetwork"] || "") + '">';
    myHTML += '<br>Company: <br><input id="pcompany" type="text" value="' + (jobObject["company"]["name"] || "") + '">';
    myHTML += '<br>Job Title: <br><input id="pjobtitle" type="text" value="' + (jobObject["jobTitle"] || "") + '">';
    myHTML += '<br>Location: <br><input id="plocation" type="text" value="' + (jobObject["location"] || "") + '">';
    myHTML += '<br>Experience: <br><input id="pexperience" type="text" value="' + (jobObject["company"]["experience"] || "") + '">';
    myHTML += '<br>Job Function/Skills: <br><input id="pjobfunction" type="text" value="' + (jobObject["company"]["jobFunction"] || "") + '">';
    myHTML += '<br>Employment Type: <br><input id="pemployment" type="text" value="' + (jobObject["company"]["employmentType"] || "") + '">';
    myHTML += '<br>Industry: <br><input id="pindustry" type="text" value="' + (jobObject["company"]["industry"] || "") + '">';
    myHTML += '<br>Salary: <br><input id="psalary" type="text" value="' + (jobObject["company"]["salary"] || "") + '">';
    // myHTML += '<input type="checkbox" value="None" id="papplied" name="check" /><label for="papplied">Applied?</label>';
    // myHTML += '<br><input type="checkbox" value="None" id="pfavorite" name="check" /><label for="pfavorite">Favorite?</label>';
    myHTML += '<br><button id="pandabutton" class="btn waves-effect waves-light" type="submit" name="action">Submit<i class="mdi-content-send right"></i></button>';
    myHTML += '</div>';
    myHTML += '<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>';
    myHTML += '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/js/materialize.min.js"></script>';
    /* and create the node */
    myHTMLNode = document.createElement('div');
    myHTMLNode.id = 'my_unique_id';
    myHTMLNode.innerHTML = myHTML;
    /* inject the node, with the event attached */
    document.body.appendChild(myHTMLNode);

    /* listener/ updata jobObject / POST jobObject */
    var updataJobObj = function(){
      jobObject['originURL'] = site;
      jobObject['jobURL'] = pathname;
      jobObject['sourceNetwork'] = document.getElementById('psource').value;    
      jobObject['jobTitle'] = document.getElementById('pjobtitle').value;
      jobObject['location'] = document.getElementById('plocation').value;
      jobObject['company']['name'] = document.getElementById('pcompany').value;
      jobObject["company"]['experience'] = document.getElementById('pexperience').value;
      jobObject["company"]['jobFunction'] = document.getElementById('pjobfunction').value;
      jobObject["company"]['employmentType'] = document.getElementById('pemployment').value;
      jobObject["company"]['industry'] = document.getElementById('pindustry').value;
      jobObject["company"]['salary'] = document.getElementById('psalary').value;      
      console.log(jobObject);
      sendData();
    };

    var pandabutton = document.getElementById('pandabutton');
    if (pandabutton.addEventListener) {
      pandabutton.addEventListener('click', updataJobObj, false);
    } else if (el.attachEvent) {
      pandabutton.attachEvent('onclick', updataJobObj);
    }  
  };