# Aurora

[Aurora](http://aurora.mythsoftware.com) is an open source project to help citizens become better informed regarding food safety and food recalls affecting their area.  It is developed and maintained by [Myth Software] (http://www.mythsoftware.com).

[Aurora](http://aurora.mythsoftware.com) consumes public data provided by the Food and Drug Administration via [OpenFDA](https://open.fda.gov). 

## Getting Started
[Aurora](http://aurora.mythsoftware.com) is deployed using a Docker container.  To get started, follow these steps:

1. Install [Docker](https://www.docker.com)
2. Clone the [Aurora repository](https://github.com/MythSoftware/aurora) from GitHub.  [Help Me](https://help.github.com/articles/fetching-a-remote/)
3. Change directory to the project home
  - *cd /path/to/aurora*
4. Run this convenience script to build a docker container and run it
  - *./devops/start.sh* (tested in Ubuntu 14.04)
5. Navigate to **[http://localhost:8888](http://localhost:8888)**


## Project Kick-Off and Team Selection

With the Aurora project, we took a code first rather than a design first approach because of the relatively small size of the project and short timeframe.  Our first step was to identify our team.  Our team consists of a product manager (product owner), a visual designer, a front end web developer, 2 back end web developers, a technical architect, a DevOps Engineer, and a content designer.

Our product owner was fully responsible for keeping the project on track, creating backlog items and prioritizing the backlog, and was wholly accountable for successful delivery.

## Project Planning

We roughly developed a user persona for what our end users looked like.  In order to simulate user interaction, we consulted with individuals not directly involved with the project for functionality they would like to see.  Our product owner created user stories and put them in the backlog in our project management tool, [Version One] (http://www.versionone.com).

Our sprints were 3 days long and we held daily, and sometimes twice daily meetings to assess progress.

## Technologies Used

Aurora uses open source, modern technologies, including [Node.js] (http://nodejs.org), [Angular JS] (http://angularjs.org), and [Bootstrap] (http://getbootstrap.com).  A full list is available on our [About Page] (http://aurora.mythsoftware.com/about).  These technologies enable us to provide a modern site that works equally well on mobile devices and full size screens on laptops and desktops.

## Deployment Platform

Our production site is composed of a load balancer and two web servers provisioned on Rackspace.  We also provisioned an orchestration server for builds and unit tests and deploying to production.  We use Rackspace’s continuous monitoring solutions to assess the health of our servers and to keep track of the load.

## Testing

We use Nightwatch for functional testing with selenium.  This allows us to perform consistent regression tests easily.

Aurora uses Karma and Jasmine for unit testing. Gulp is used to kick off the unit tests as part of our build process driven by Jenkins.  Failed unit tests cause the build to fail and send email to the aurora-dev mailing list so the problem can quickly be addressed.

## CM Tools

[Aurora](http://aurora.mythsoftware.com) utilizes [Jenkins](http://https://jenkins-ci.org/), [Ansible](http://www.ansible.com/home) and [Docker](https://www.docker.com) for configuration management and the ability to quickly ship code with zero down time using a rolling deployment strategy.  For more details, see our [DevOps README](devops).

## Development and Iteration

Since we coded first to assess the strengths and weaknesses of the OpenFDA API, we had to make course corrections on occasion to make sure we could still meet the goals that our target customer would want to achieve.  We consistently involved external people not on the core team in the project for feedback, and using that feedback, adjusted our course.

Our objective was to put as many wish list items into the backlog and prioritize them.  Each sprint we completed the highest priority items, added any new items with priority and pushed unfinished items into the next sprint.

During the course of development, we learned that some features did not make sense for the end user (our end user didn’t really care about searching the entire US for broccoli recalls), so we adjusted to offer more useful features.

Our visual designer created wireframes and psd files for the developers to use once we had a better idea what to expect from the API.  She also created a user style guide that can be found in the repository.

## Licensing

All of the technologies used in the development of Aurora are open source and free to use.  Please refer to our [About Page] (http://aurora.mythsoftware.com/about).
