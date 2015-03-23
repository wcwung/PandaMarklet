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
      if (true) { //resp.isAuthenticated
        showBookMarklet();
      } else {
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
      var url = 'https://httpbin.org/post';
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.send( JSON.stringify(jobObject) );
      alert('Job saved');
    };

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

    /* FORM */
    var myCSS, myStyleNode,
        myHTML, myHTMLNode, myCssNode;

    /* add the css */
    myCSS = '@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,500,100);';
    myCSS += '#my_unique_id, #my_unique_id *{color:#fff;line-height:0;font-size:15px;text-shadow:none;}';
    myCSS += '#my_unique_id {z-index:10000;position:fixed;top:0;right:0px;background-color:#fff;}';
    myCSS += '#my_unique_id .c {height: 900px;width: 250px;padding:20px; padding-top: 50px; background-color: #00bcd4}';
    // myCSS += '#my_unique_id #pandabutton {background-color:#ff4081; color: #fff; border-radius: 5px; padding: 2px 20px; margin-top: 5px}';
    myCSS += '#my_unique_id input {color: #333}';
    // myCSS += '#my_unique_id .squaredThree, .favorite {display: inline-block;width:20px;margin:20pxauto;position:relative;float:right; margin-top:3px}';
    // myCSS += '#my_unique_id .squaredThree label, .favorite label {cursor: pointer;position: absolute;width: 20px;height: 20px;top: 0;border-radius: 4px;-webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);-moz-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);background: -webkit-linear-gradient(top, #fff 0%, #eee 100%);background: -moz-linear-gradient(top, #fff 0%, #eee 100%);background: -o-linear-gradient(top, #fff 0%, #eee 100%);background: -ms-linear-gradient(top, #fff 0%, #eee 100%);background: linear-gradient(top, #fff 0%, #eee 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#fff", endColorstr="#eee",GradientType=0 );}';
    // myCSS += '#my_unique_id .squaredThree label:after, .favorite label:after {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter: alpha(opacity=0);opacity: 0;content: "";position: absolute;width: 9px;height: 5px;background: transparent;top: 4px;left: 4px;border: 3px solid #ff4081;border-top: none;border-right: none;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-o-transform: rotate(-45deg);-ms-transform: rotate(-45deg);transform: rotate(-45deg);}';
    // myCSS += '#my_unique_id .squaredThree label:hover::after, .favorite label:hover::after {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";filter: alpha(opacity=30);opacity: 0.3;}';
    // myCSS += '#my_unique_id .squaredThree input[type=checkbox]:checked + label:after, .favorite input[type=checkbox]:checked + label:after {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";filter: alpha(opacity=100);opacity: 1;}';
    /* then insert it */ 
    myStyleNode =  document.createElement('style');
    myStyleNode.innerHTML = myCSS;
    document.body.appendChild(myStyleNode);

    /* build the HTML element */
    myCss += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/css/materialize.min.css">';
    myHTML += '<div class="c">';
    myHTML += 'Source Network: <br><input id="psource" type="text" value="' + (jobObject["sourceNetwork"] || "") + '">';
    myHTML += '<br>Company: <br><input id="pcompany" type="text" value="' + (jobObject["company"]["name"] || "") + '">';
    myHTML += '<br>Job Title: <br><input id="pjobtitle" type="text" value="' + (jobObject["jobTitle"] || "") + '">';
    myHTML += '<br>Location: <br><input id="plocation" type="text" value="' + (jobObject["location"] || "") + '">';
    myHTML += '<br>Experience: <br><input id="pexperience" type="text" value="' + (jobObject["company"]["experience"] || "") + '">';
    myHTML += '<br>Job Function/Skills: <br><input id="pjobfunction" type="text" value="' + (jobObject["company"]["jobFunction"] || "") + '">';
    myHTML += '<br>Employment Type: <br><input id="pemployment" type="text" value="' + (jobObject["company"]["employmentType"] || "") + '">';
    myHTML += '<br>Industry: <br><input id="pindustry" type="text" value="' + (jobObject["company"]["industry"] || "") + '">';
    myHTML += '<br>Salary: <br><input id="psalary" type="text" value="' + (jobObject["company"]["salary"] || "") + '">';
    myHTML += '<input type="checkbox" value="None" id="papplied" name="check" /><label for="papplied">Applied?</label>';
    myHTML += '<br><input type="checkbox" value="None" id="pfavorite" name="check" /><label for="pfavorite">Favorite?</label>';
    myHTML += '<br><button id="pandabutton" class="btn waves-effect waves-light" type="submit" name="action">Submit<i class="mdi-content-send right"></i></button>';
    myHTML += '</div>';
    myHTML += '<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>';
    myHTML += '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/js/materialize.min.js"></script>';
    /* and create the node */
    myHTMLNode = document.createElement('div');
    myHTMLNode.id = 'my_unique_id';
    myHTMLNode.innerHTML = myHTML;
    /* injec the node, with the event attached */
    document.body.appendChild(myHTMLNode);

    myCssNode = document.createElement('span');
    myCssNode.innerHTML = myCss;
    document.head.insertBefore(myCssNode, document.head.firstChild);

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
      jobObject["applied"] = document.getElementById("papplied").checked;
      jobObject["favorite"] = document.getElementById("pfavorite").checked;
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