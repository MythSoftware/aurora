# Aurora - DevOps and Infrastructure

This document gives a general overview of our DevOps infrastructure and processes.

[Aurora](http://aurora.mythsoftware.com) utilizes [Jenkins](https://jenkins-ci.org/), [Ansible](http://www.ansible.com/home) and [Docker](https://www.docker.com) for configuration management and the ability to quickly ship code with zero down time using a rolling deployment strategy. 

[Jenkins](https://jenkins-ci.org/) kicks off the build. It runs our unit tests and ensures they pass. Then it kicks off our Ansible playbook to provision the web servers and deploy the code. This step also decrypts our ansible vault and sets up the production environment with the proper credential variables. Then it triggers the docker container to start.

##Deploy to Production

Follow the following steps to deploy the latest master code to production:

1. ssh *your-name*@*ip-of-orchestration-server*
2. sudo su orcha
3. cd ~/proj/aurora
4. ./devops/deploy.sh

##Provision a new web server

1.  Create a server from the image named "web-image"
2.  Add the server to /devops/hosts under the **web** group
3.  Make sure your code gets merged in
4.  ssh *your-name*@*ip-of-orchestration-server*
5.  sudo su orcha
6.  cd ~/proj
7.  sudo rm -rf aurora
8.  git clone https://github.com/MythSoftware/aurora.git
9.  cd ~/proj/aurora
10. ./devops/deploy.sh

##Decommission a web server

1.  Remove the server from /devops/hosts
2.  Make sure your code gets merged in
3.  Remove the node from the load balancer on the control panel
4.  Delete the server from the control panel
5.  ssh *your-name*@*ip-of-orchestration-server*
6.  sudo su orcha
7.  cd ~/proj
8.  sudo rm -rf aurora
9.  git clone https://github.com/MythSoftware/aurora.git

##Infrastructure

### Orchestration Server
The orchestration server is a cloud server for orchestrating integration testing, zero-downtime deployments, and configuration mangagement.

* [Ansible](http://www.ansible.com/home) is installed to
  * clone the git repository
  * provision the servers
  * copy code to the servers
  * start the [Docker](https://www.docker.com) containers

### Cloud Load Balancer
The cloud load balancer distributes network traffic to the web servers.

### Web Image

The web image is an image we can use to spin up web servers

* OS - Ubuntu 14.04
* SSH keys are configured to allow SSH access from a designated user from the orchestration server

### Web Server
The web servers are cloud servers accepting http traffic and serving content or data.
