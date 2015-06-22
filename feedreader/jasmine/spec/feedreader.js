/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    "use strict";
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    // Tests that RSS Feeds loads and shows at least 1 article.
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

    /* Run articles through for loop, store value in [i]
     * Tests that Feed URL has definition and content 
     * then checks that the Feed's name is populated
     */
    describe('Feed Looper', function() {
        it('ensures all URLs and Names are not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toMatch('http');
                expect(allFeeds[i].name).not.toBe(null);
            }
        });
    });

    });

    // store a var menu for jQuery DOM manipulation
    describe("The Menu", function() {
        var menu = $('.menu-icon-link');        

        // Body's menu-hidden class is hiding and listening for click
        it('ensures menu element is hidden', function() {
            expect(document.getElementsByClassName("menu-hidden")).toBeTruthy();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* menu appears when clicked.
         * try this in the console! define var menu then call menu.click();
         * it's really exciting to see my javascript work in real time.
         * I probably called menu.click() a few minutes too long just watching it work
         */
        it("ensures menu toggles", function() {
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false); //menu displays when clicked

            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true); //menu hides when clicked again
        });
    });

    // load the first feed before testing
    describe("Initial Entries", function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        }, 1000);

        // several tests for checking the presence of entries in feed
        it("ensures .entry element in .feed container after asynch load", function(done) {
            expect($('.feed .entry-link .entry').length).toBeGreaterThan(0);
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* collect a snapshot of two feed screens and compares them for differences
     * also serves the function of checking for undefined feeds by testing not.toEqual
     */
    describe("New Feed Selection", function() {
        var firstFeed;
        var secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.entry').find("h2")[0].innerText;
            });
            loadFeed(1, function() {
                secondFeed = $('.entry').find("h2")[0].innerText;
                done();
            });
        });

        /* another fun console.log practice is to call loadFeed with params 
         * after calling Feed variables. 
         * JavaScript in action!!
         */
        it("ensures content changes", function(done) {
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });

        afterAll(function(done) {
            loadFeed(0, done);
        }, 1000);

    }); 

    /* Going for Exceeds Expectations with a hypothetical test for a
     * hypothetical feature. Allowed to fail per the project rubric.
     * if next and previous buttons (Arrows) were incorporated this would ensure
     * that the buttons are responsive and article entries change
     */
    describe("New Feed Screen", function() {
        var nextArrow = $('.menu.icon.next');
        var previousArrow = $('.menu.icon.previous');
        var feedPage;
        var feedPage2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedPage = $('.entry').find("h2")[0].innerText;
            });
            loadFeed(1, function() {
                feedPage2 = $('.entry').find("h2")[0].innerText;
                done();
            });
        });

        it("changes articles displayed in feed", function(done) {
            nextArrow.click();
            expect(feedPage2).toEqual($('.entry').find("h2")[0].innerText);

            previousArrow.click();
            expect(feedPage).toBe($('.entry').find("h2")[0].innerText);
            done();
        });

        afterAll(function(done) {
            loadFeed(0, done);
        }, 1000);
    });
}());
