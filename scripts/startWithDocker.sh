sudo docker kill $(sudo docker ps -a -q)
sudo docker build -t aurora -rm=true .
sudo docker run -p 8888:8888 -d aurora
