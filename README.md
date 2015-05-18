# TheChronicMonster.github.io

Project 5
Project five can be experienced at http://thechronicmonster.github.io/maps/
The source code is within the maps folder.

Project 5 in Udacity's front end nanodegree's greatest lesson can be wrapped up in two words. Scope Matters.
Which consequently, would make a great title to an article on the subject. My map of Janesville, WI highlights some local attractions for the city. Something for everyone is highlighted, local restaurants, bars and taverns, parks and places of entertainment. Use the filter bar to filter the list of predetermined locations, click on the list view to find the marker you'd like, or click randomly on markers to see information as provided by the foursquare API.

Yes that's right, this map implements google maps api and foursquare's api. Which brings us to the second lesson learned in this project, AJAX and JSON requests. They can be difficult at first, but are a lot of fun to play with once you find your way into the response.

This project was built using the Knockout JS framework. It's an MVVM (model view viewmodel) that helps separate concerns, specifically the view from the viewmodel. These two elements of the source never speak to each other, they communicate through bindings. This might sound odd at first, but the MVVM framework allows exponential scaleability, much like the system of wires built for landline telephones in the 20th century. jQuery is also used to help with the JSON request and infowindow population. Without jQuery DOM manipulation would be a bit more tedious and we'd have even more articles to read about why we should all stop using javaScript.

I could not have completed this project without weeks of patient work and dozens of online resources. Resources include stackoverflow, the Udacity forums, online hangouts with coaches, online hangouts with fellow students, repositories of students also working through the forums, Udacity online classes, knockmeout.net, google developer resources, foursquare api developer resource pages, jQuery documentation and especially knockout documentation.

I went through the knockout tutorials everyday for at least a week until data-binding and applyBindings was wrote into my brain. I'm very happy that all the pieces finally clicked together.

Project 4
The Web Optimization project was much more intensive than I had expected. It has made me quesiton whether I am cut out for for front-end web development or not. Nevertheless, I press forward.

This website package is a basic web page holding an introductory homepage and a handful of links to various projects. All images have been compressed, Google Analytics has been entered into the HTML, and fonts have been reduced to a sans serif for optimal speed. 

Index.html received a page speed score of 96/100 for mobile! The only thing I wasn't able to do was cache-control the css and js files. I was surprised how compressed images can be before losing their integrity. 

Pizza.html and main.js is where most of my time was spent. All CSS was inlined into Pizza.html and the bootstrap file was minified. A long form copy exists for your reading pleasure on this file and all other minified files.

Pizza's main.js creates an array of pizza ingredients and arrays of adjectives and nouns to create 46 random pizzas as well as two constant pizzas as defined in the html. 

I compressed the sliding pizzas and reduced their movement to well below 60 fps. Console.log() and the timeline helped me see where inefficiencies were in the code. Load times dropped drastically by pulling constants out of the for loops in changePizzaSizes and updatePositions. It was almost magical to see the difference.

"document." was called several times throughout the main.js. This is very costly so variables were used in place everytime possible.

Working through this course has solidified the importance of research. Incountable pages of MDN and W3Schools were referenced throughout this code. One of the most revealing lessons was going through the code and looking at bits of code like the querySelector and createElement. This is a field where there's always something new to learn!'

All that's left for you to do is order a pizza and enjoy!



## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
