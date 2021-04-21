# nginx expirable link

### 1.INSTALLTION

```bash
wget http://nginx.org/keys/nginx_signing.key -O nginx_signing.key
sudo apt-key add nginx_signing.key
echo "deb http://nginx.org/packages/mainline/ubuntu/ xenial nginx" | sudo tee -a /etc/apt/sources.list
sudo apt-get update
sudo apt-get install nginx nginx-module-njs
```

### 2.CONFIGURATION

```bash
cp nginx.conf /etc/nginx/nginx.conf
cp authenticator.js /etc/nginx/authenticator.js

sudo nginx

pip install click 
```

### 3.USAGE

assume that you have a file named `dog.jpg` which absolute path is `/home/admin/public/image/dog.jpg` and `alias` or `root` directive value is `/home/admin/public` in your nginx configuration, then you can generate expirable link by following command.
```bash
python gen_link.py -f image/dog.jpg -e 3h
```