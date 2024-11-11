
Wont cover
* how the internet works
* HTTP request-response model
* client vs server requests
* web servers
* accessing data on your website
* ip addresses and domains


Will cover
* the underlying code needed to tell your browser how to render a web page
* The role of HTML, CSS, and JS to create a website
* How the Maroon Data teams uses HTML, CSS, and JS to create visualizations
* how to see what you create locally on your computer in the browser


1. Rendering a webpage
* your browser takes HTML, CSS, and JS as intructions to build a webpag
    * inspect page source 

1. HTML, CSS, and JS, whats the difference
* Purposes of the main web authoring technologies:
    * HTML is for structure and semantics (meaning).
        * DOM 
        * what does semantic HTML (`<main>, <section>, <article>, <header>`)
        * what are elements
        * https://internetingishard.netlify.app/html-and-css/basic-web-pages/ (i like the summary at the bottom here)
        * (https://motherfuckingwebsite.com/) sorry for language but good example with no styling

    * CSS is for styling and layout.
        * Basic selectors — element type, class, ID
        * box model https://internetingishard.netlify.app/html-and-css/css-box-model/
        * The cascade (Cascading Style Sheets)
        * Resources
            * https://htmlforpeople.com/css-basics/
            * https://internetingishard.netlify.app/html-and-css/hello-css/ 
    * JavaScript is for controlling dynamic behavior.
        * HTML as a DOM (or tree) show an image of website as tree
            * The Document Object Model is a cross-platform and language-independent interface that treats an HTML or XML document as a tree structure wherein each node is an object representing a part of the document
        * JS can be used to access and modify DOM elements
        * JS objects (where JSON comes from)
        * allows you to do very cool things like https://pudding.cool/2023/10/genre/
    * you CAN have CSS in a `<style></style>` block and JS in a `<script></script>` block in an html document but bad practice, separate for 
        * Code management and comprehension.
        * Teamwork/separation of roles.
        * Performance.

* how we use these tools
    * each chart is its own webpage with a HTML, CSS, and JS file
        * show example of a folder
    * HTML (index.html) just has one element usually which is the chart
    * CSS (static/main.css) styling is default and doesnt change 
    * js (main.js) uses a package called highcharts that takes a JSON element and converts it to "real" JS