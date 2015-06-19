# Aurora

[Aurora](#) is an open source project to help citizens become better informed regarding food safety and food recalls affecting their area.  It is developed and maintained by [Myth Software](http://www.mythsoftware.com).

[Aurora](#) consumes public data provided by the Food and Drug Administration via [OpenFDA](https://open.fda.gov). 

## Getting Started
[Aurora](#) is deployed using a Docker container.  To get started, follow these steps:

1. Install [Docker](https://www.docker.com/)
2. Clone the [Aurora repository](https://github.com/MythSoftware/aurora) from GitHub.  [Help Me](https://help.github.com/articles/fetching-a-remote/)
3. Change directory to the project home
  - *cd /path/to/aurora/web*
4. Run this convenience script to build a docker container and run it
  - *./devops/start.sh* (tested in Ubuntu 14.04)
5. Navigate to **[http://localhost:8888](http://localhost:8888)**
