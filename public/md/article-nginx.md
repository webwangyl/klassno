### Nginx从安装到部署

----

**安装篇**

安装依赖

```
yum install gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
```



下载安装包

```
wget http://nginx.org/download/nginx-1.16.1.tar.gz
```



解压nginx

```
cd /usr/local
mkdir nginx
cd nginx
tar -xvf nginx-1.16.1.tar.gz
```



安装

```
cd /usr/local/nginx
cd nginx-1.16.1
./configure --with-http_stub_status_module --with-http_ssl_module
make
make install
```



启动

```
cd /usr/local/nginx/sbin
./nginx
```

----

**常用命令**

停止nginx

```
./nginx -s stop
```



重启nginx

```
./nginx -s reload
```



查看nginx进程

```
ps -ef|grep nginx
```



配置环境变量

```
vi /etc/profile

# 编辑添加如下
PATH=$PATH:/usr/local/nginx/sbin
export PATH

# 保存退出并执行如下
source /etc/profile
```



----

**部署**

修改nginx配置指向dist目录，将打包完成的dist文件夹扔进nginx目录内即可

```
location / {
    root   dist;
    index  index.html index.htm;
}
```



history模式解决刷新404

```
location / {
    root   dist;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
}

```

由于刷新时浏览器会通过url去请求对应路径的资源文件，所以让刷新找不到对应文件时，指向index.html，这是index.html就会根据对应路径显示对应路由



开启gzip部署

```
gzip on;
gzip_buffers 4 16k;
gzip_comp_level 6;
gzip_types text/plain application/javascript text/css text/javascript;
```

以上代码可放在http、location、server中任意一块，以上配置含义如下。

开启gzip模块

设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流

gzip压缩比

匹配MIME类型进行压缩，text/html类型总是会被压缩