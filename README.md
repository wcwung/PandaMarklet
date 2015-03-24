# PandaMarklet

A bookmarklet for our JobPanda App. Gathers job information and sends it to our server for management. 

Bookmarklet.js is the first form of the bookmark without the form. This one just scrapes the information from AngelList and LinkedIn and automactically sends info to server.

jobPanda.js is the lastest edition with the form that auto-fills if its in the site that auto-fills or empty if not. The consumer has to click on the submit button to send the info to the server. 

Note**
In index.js, the script.src is the url that the function js file should be at.
Because of mix-cross-origin thingy, the urls you use for GET and POST needs to be in https.

Ask Wendy for more details if needed. :)