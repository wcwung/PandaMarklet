(function () {

    var myCSS, myStyleNode,
        myHTML, myHTMLNode;
    var sayHello;

    /* add the css */
    myCSS  = '#my_unique_id, #my_unique_id *{font-family:Courier,"Courier New",sans-serif;color:#333;line-height:1.5em;font-size:15px;margin:0;padding:0;text-shadow:none;}';
    myCSS += '#my_unique_id {z-index:10000;position:fixed;bottom:0;left:300;background-color:#fff;}';
    myCSS += '#my_unique_id .c {heigth: 300px; width: 500px;padding:20px; background-color: red}';
    myCSS += '#my_unique_id h1 {font-size:20px; margin-bottom:0.5em;color:#0080C0}';
    myCSS += '#my_unique_id p {margin-bottom:0.5em;}';
    /* then insert it */
    myStyleNode =  document.createElement('style');
    myStyleNode.innerHTML = myCSS;
    document.body.appendChild(myStyleNode);

    /* build the HTML element */
    myHTML  = '<div class="c">';
    myHTML += 'Company: <input type="text"/>';
    myHTML += 'Job Title: <input type="text"/>';
    myHTML += 'Location: <input type="text"/>';
    myHTML += 'Experience: <input type="text"/>';
    myHTML += 'Job Function/Skills: <input type="text"/>';
    myHTML += 'Employment Type: <input type="text"/>';
    myHTML += 'Industry: <input type="text"/>';
    myHTML += '</div>';
    /* and create the node */
    myHTMLNode = document.createElement('div');
    myHTMLNode.id = 'my_unique_id';
    myHTMLNode.innerHTML = myHTML;

    /* add js functionality to it */
    sayHello = function() {
      var who = window.prompt('who?'); alert('hello '+who);
    };
    
    // if (myHTMLNode.addEventListener) {
    //   myHTMLNode.addEventListener('click', sayHello, false);
    // } else if (el.attachEvent) {
    //   myHTMLNode.attachEvent('onclick', sayHello);
    // }
    
    /* injec the node, with the event attached */
    document.body.appendChild(myHTMLNode);
  
}());