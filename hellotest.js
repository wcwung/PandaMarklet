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
      companydata.push( $('.salary').text().split('\n').slice(1,4).join('') );

      fillJobObj(jobObject, descriptions, jobdata);
      fillJobObj(jobObject['Company'], company, companydata);
      console.log(jobObject);
    }

    /* FORM */
    var myCSS, myStyleNode,
        myHTML, myHTMLNode;

    /* add the css */
    myCSS = '@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,500,100);';
    myCSS += '#my_unique_id, #my_unique_id *{font-family:"Roboto","Courier New",sans-serif;color:#fff;line-height:1.5em;font-size:15px;padding:0;text-shadow:none;}';
    myCSS += '#my_unique_id {z-index:10000;position:fixed;top:0;right:0px;background-color:#fff;}';
    myCSS += '#my_unique_id .c {height: 900px;width: 250px;padding:20px; padding-top: 50px; background-color: #00bcd4}';
    myCSS += '#my_unique_id #pandabutton {background-color:#ff4081; color: #fff; border-radius: 5px; padding: 2px 20px; margin-top: 5px}';
    myCSS += '#my_unique_id input {width: 100%; color: #333; border-radius: 5px; padding: 5px}';
    myCSS += '#my_unique_id .squaredThree, .favorite {display: inline-block;width:20px;margin:20pxauto;position:relative;float:right; margin-top:3px}';
    myCSS += '#my_unique_id .squaredThree label, .favorite label {cursor: pointer;position: absolute;width: 20px;height: 20px;top: 0;border-radius: 4px;-webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);-moz-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,.4);background: -webkit-linear-gradient(top, #fff 0%, #eee 100%);background: -moz-linear-gradient(top, #fff 0%, #eee 100%);background: -o-linear-gradient(top, #fff 0%, #eee 100%);background: -ms-linear-gradient(top, #fff 0%, #eee 100%);background: linear-gradient(top, #fff 0%, #eee 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#fff", endColorstr="#eee",GradientType=0 );}';
    myCSS += '#my_unique_id .squaredThree label:after, .favorite label:after {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter: alpha(opacity=0);opacity: 0;content: "";position: absolute;width: 9px;height: 5px;background: transparent;top: 4px;left: 4px;border: 3px solid #ff4081;border-top: none;border-right: none;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-o-transform: rotate(-45deg);-ms-transform: rotate(-45deg);transform: rotate(-45deg);}';
    myCSS += '#my_unique_id .squaredThree label:hover::after, .favorite label:hover::after {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";filter: alpha(opacity=30);opacity: 0.3;}';
    myCSS += '#my_unique_id .squaredThree input[type=checkbox]:checked + label:after, .favorite input[type=checkbox]:checked + label:after {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";filter: alpha(opacity=100);opacity: 1;}';
    /* then insert it */ 
    myStyleNode =  document.createElement('style');
    myStyleNode.innerHTML = myCSS;
    document.body.appendChild(myStyleNode);

    /* build the HTML element */
    myHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/css/materialize.min.css">';
    myHTML  = '<div class="c">';
    myHTML += 'Source Network: <br><input id="psource" type="text" value="' + (jobObject["Source Network"] || "") + '">';
    myHTML += '<br>Company: <br><input id="pcompany" type="text" value="' + (jobObject["Company"]["Name"] || "") + '">';
    myHTML += '<br>Job Title: <br><input id="pjobtitle" type="text" value="' + (jobObject["Job Title"] || "") + '">';
    myHTML += '<br>Location: <br><input id="plocation" type="text" value="' + (jobObject["Location"] || "") + '">';
    myHTML += '<br>Experience: <br><input id="pexperience" type="text" value="' + (jobObject["Company"]["Experience"] || "") + '">';
    myHTML += '<br>Job Function/Skills: <br><input id="pjobfunction" type="text" value="' + (jobObject["Company"]["Job Function"] || "") + '">';
    myHTML += '<br>Employment Type: <br><input id="pemployment" type="text" value="' + (jobObject["Company"]["Employment Type"] || "") + '">';
    myHTML += '<br>Industry: <br><input id="pindustry" type="text" value="' + (jobObject["Company"]["Industry"] || "") + '">';
    myHTML += '<br>Salary: <br><input id="psalary" type="text" value="' + (jobObject["Company"]["Salary"] || "") + '">';
    myHTML += '<br>Have you applied?<div class="squaredThree"><input type="checkbox" value="None" id="squaredThree" name="check" /><label for="squaredThree"></label></div>';
    myHTML += '<br>Favorite?<div class="favorite"><input type="checkbox" value="None" id="favorite" name="check" /><label for="favorite"></label></div>';
    myHTML += '<br><button id="pandabutton">Submit</button>';
    myHTML += '</div>';
    myHTML += '<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>';
    myHTML += '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/js/materialize.min.js"></script>';
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
      jobObject["Company"]['Salary'] = document.getElementById('psalary').value;      
      jobObject["Applied"] = document.getElementById("squaredThree").checked;
      jobObject["Favorite"] = document.getElementById("favorite").checked;
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