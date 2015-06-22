var bio = {
	"name" : "JP Miller",
	"role" : "Executive Content Director at UrbanGamingElite.com",
	"welcomeMessage" : "I love writing, coding and learning. My goal is to create excellent user experiences.",
	"contacts" : {
		"twitter" : "@theChronicMonst",
		"email" : "legendzing@gmail.com",
		"mobile" : "903-293-6594",
		"location" : "Madison, WI",
		"github" : "theChronicMonster",
		"gitHubUrl" : "https://www.github.com/thechronicmonster",
		"linkedIn" : "linkedin.com/in/jpmillerii",
		"blog" : "http://www.theChronicMonster.com",
		"relocation" : "Willing to relocate"
	},
	"bioPic" : "Images/bioImage.jpg",
	"skills" : ["Front-End Design & Development", "HTML & CSS", "JavaScript", "Writing", "Marketing", "Management", ],
	display: function() {
		var bi = bio.contacts;
		var formattedName = HTMLheaderName.replace("%data%", bio.name);
		var formattedRole = HTMLheaderRole.replace("%data%", bio.role);

		var formattedTwitter = HTMLtwitter.replace("%data%", bi.twitter);
		var formattedEmail = HTMLemail.replace("%data%", bi.email);
		var formattedMobile = HTMLmobile.replace("%data%", bi.mobile);
		var formattedGitHub = HTMLgithub.replace("%data%", bi.github);
		//formattedGitHub = formattedGitHub.replace("%url%", bi.gitHubUrl);

		var formattedBlog = HTMLblog.replace("%data%", bi.blog);
		var formattedLocation = HTMLlocation.replace("%data%", bi.location);

		var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
		var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);

		$("#header").prepend(formattedName + formattedRole);
		$("#topContacts").append(formattedMobile + formattedEmail + formattedGitHub + formattedTwitter + formattedBlog + formattedLocation);
		$("#footerContacts").append(formattedMobile + formattedEmail + formattedGitHub + formattedTwitter + formattedBlog + formattedLocation);
		$("#header").append(formattedBioPic + formattedWelcomeMsg + HTMLskillsStart);
		for (var skill in bio.skills) {
			var formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
			$("#skills").append(formattedSkill);
		}
	}
};

var work = {
	"jobs": [
		{
			"employer": "Udacity",
			"title": "Resume & Online Profile Reviewer",
			"url" : "https://www.udacity.com",
			"dates": "June 2015 - Current",
			"description": "Research best practices and advice newly graduated students on crafting resumes that result in interviews. Five-star reviewer rating.",
			"location" : "Remote"
		},
		{
			"employer": "Urban Gaming Elite",
			"title": "Executive Content Director",
			"url" : "http://www.urbangamingelite.com",
			"dates": "August 2014 - June 2015",
			"description": "Strategized with UGE's founder, managed 18 freelance writers and pushed live content to the site.",
			"location" : "Madison, WI"
		},
		{
			"employer": "Self Employed",
			"title": "Freelance Writer",
			"url" : "http://www.thechronicmonster.com",
			"dates": "February 2013 - June 2015",
			"description": "Produced more than 100 pieces of content for real estate and love advice blogs.",
			"location" : "Janesville, WI"
		},
		{
			"employer": "Self Employed",
			"title": "Independent Courier",
			"url" : "http://www.theChronicMonster.com",
			"dates": "January 2012 - December 2014",
			"description": "Delivered consumer and agricultural goods as well as bank deposits on regularly scheduled routes in the Greater Chicago Region.",
			"location" : "Chicago, IL"
		}],
		display: function() {
			for (job in work.jobs) {
				var emp = work.jobs[job];
				$("#workExperience").append(HTMLworkStart);

				var formattedEmployer = HTMLworkEmployer.replace("%data%", emp.employer);
				formattedEmployer = formattedEmployer.replace("%url%", emp.url);
				var formattedTitle = HTMLworkTitle.replace("%data%", emp.title);
				var formattedDates = HTMLworkDates.replace("%data%", emp.dates);
				var formattedLocation = HTMLworkLocation.replace("%data%", emp.location);
				var formattedDescription = HTMLworkDescription.replace("%data%", emp.description);
				var formattedEmployerTitle = formattedEmployer + formattedTitle;

				$(".work-entry:last").append(formattedEmployerTitle + formattedDates + formattedLocation + formattedDescription);
			}
		}
}

var education = {
	"schools": [
		{
			"name" : "Udacity",
			"url" : "https://www.udacity.com/",
			"degree" : "Nanodegree",
			"major" : "Front-End Web Development",
			"societies" : "Inaugural Cohort",
			"url" : "http://www.udacity.com",
			"location" : "San Francisco, CA"
		},
		{
			"name" : "The Second City",
			"url" : "http://www.secondcity.com/courses/chicago/general-information/",
			"degree" : "One Year Certificate",
			"major" : "Improvisational Acting",
			"societies" : "The Scribes",
			"url" : "http://www.secondcity.com/courses/chicago/adult/",
			"location" : "Chicago, IL"
		},
		{
			"name" : "Texas A&M University-Texarkana",
			"url" : "http://www.tamut.edu/",
			"degree" : "Bachelor",
			"major" : "Applied Arts & Sciences",
			"societies" : "Student Leadership Development Program",
			"url" : "http://tamut.edu/index.php",
			"location" : "Texarkana, TX"
		},
		{
			"name" : "Texarkana College",
			"url" : "https://www.texarkanacollege.edu/",
			"degree" : "Associate",
			"major" : "Business Marketing",
			"societies" : "Phi Theta Kappa",
			"url" : "https://www.texarkanacollege.edu/",
			"location" : "Texarkana, TX"
		}],
		displayEducation: function() {
			for (school in education.schools) {
				var edu = education.schools[school];
				$("#education").append(HTMLschoolStart);
				var formattedName = HTMLschoolName.replace("%data%", edu.name);
				formattedName = formattedName.replace("%url%", edu.url);
				var formattedDegree = HTMLschoolDegree.replace("%data%", edu.degree);
				var formattedMajor = HTMLschoolMajor.replace("%data%", edu.major);
				var formattedLocation = HTMLschoolLocation.replace("%data%", edu.location);

				$(".education-entry:last").append(formattedName + formattedDegree + formattedMajor + formattedLocation);
			}
		}
}

var projects = {
	"projects": [
		{
			"title" : "Portfolio Mockup",
			"url" : "https://thechronicmonster.github.io/mug-mockup/",
			"dates" : "November 2014",
			"description" : "I created a web friendly mockup from a pdf file. Project utilizes HTML, Bootstrap and a JavaScript Modal.",
			"image" : "Images/mug.png"
		},
		{
			"title" : "Frogger Game Clone",
			"url" : "https://thechronicmonster.github.io/frogger-clone/",
			"dates" : "February 2015",
			"description" : "A point for nostalgia. I recreated the classic frogger game using boys and bugs.",
			"image" : "Images/frogger.png"
		},
		{
			"title" : "Website Optimization",
			"url" : "https://thechronicmonster.github.io/views/pizza.html",
			"dates" : "March 2015",
			"description" : "I began with a very clunky webpage and optimizated it to render within milliseconds.",
			"image" : "Images/pagespeed.png"
		},
		{
			"title" : "Feed Reader Testing with JasmineJS",
			"url" : "http://thechronicmonster.github.io/feedreader/",
			"dates" : "April 2015",
			"description" : "JasmineJS provides an excellent way to bug proof code with test driven development. I used the red-green testing method to ensure that every aspect of the web page worked as expected.",
			"image" : "Images/jasmine.png"
		},
		{
			"title" : "Neighborhood Map",
			"url" : "https://thechronicmonster.github.io/maps/",
			"dates" : "May 2015",
			"description" : "The Neighborhood Map incorporates the Google Maps and FourSquare APIs to create a map of interesting locations in my community.",
			"image" : "Images/google-maps-logo.png"
		}],
		display: function() {
			for (var e in projects.projects) {
				var projs = projects.projects[e];
				$("#projects").append(HTMLprojectStart);
				var formattedTitle = HTMLprojectTitle.replace("%data%", projs.title);
				formattedTitle = formattedTitle.replace("%url%", projs.url);
				var formattedDates = HTMLprojectDates.replace("%data%", projs.dates);
				var formattedDescription = HTMLprojectDescription.replace("%data%", projs.description);
				var formattedImage = HTMLprojectImage.replace("%data%", projs.image);
				$(".project-entry:last").append(formattedTitle + formattedDates + formattedDescription + formattedImage);
				$(".project-entry:last").append("<br><div><hr class='section-hr'></div>");
			}
		}
};



function locationizer(work) {
	var locArray = [];

	for (job in work.jobs) {
	var newLoc = work.jobs[job].location;
	locArray.push(newLoc);
	}

	return locArray;
}

// console.log(locationizer(work));

function internationalizeName(name) {
	name = name.trim().split(" ");
	console.log(name);
	name[1] = name[1].toUpperCase();
	name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();

	return name[0] + " " + name[1];
}

// $(".main").append(internationalizeButton);

// function calls
bio.display();
work.display();
projects.display();
education.displayEducation();

// Appends google map to resume
//$("#mapDiv").append(googleMap);

