# Aurora - DevOps and Infrastructure

This document gives a general overview of our DevOps infrastructure and processes.

##Infrastructure

### Orchestration Server
The orchestration server is a cloud server for orchestrating integration testing, zero-downtime deployments, and configuration mangagement.

* [Ansible](http://www.ansible.com/home) is installed to
  * clone the git repository
  * provision the servers
  * copy code to the servers
  * start the [Docker](https://www.docker.com) containers
* [UFW](https://wiki.ubuntu.com/UncomplicatedFirewall) rules
  * default deny incoming
  * allow ssh

### Cloud Load Balancer
The cloud load balancer distributes network traffic to the web servers.

### Web Server Image

The web server image is an image we can use to spin up web servers

* OS - Ubuntu 12.04
* SSH keys are configured to allow SSH access from a designated user from the orchestration server
* [UFW](https://wiki.ubuntu.com/UncomplicatedFirewall) rules
  * default deny incoming
  * allow from *the orchestration server* to any port 22

### Web Server
The web servers are cloud servers accepting http traffic and serving content or data.

* [UFW](https://wiki.ubuntu.com/UncomplicatedFirewall) rules
  * inherits UFW rules from the Web Server Image
  * [Ansible](http://www.ansible.com/home) provisions the web servers to open port 8888
