echo "开始构建"

#安装依赖
yarn install
#编码源码
npm run build
#获取镜像信息
imagesId=`docker images|grep -i loozb-front|awk '{print $3}'`

#判断镜像是否存在，如果存在强行删除
if ! -n "$imagesId";then
  echo "当前镜像不存在"
else 
  docker rmi $imagesId -f
fi

#构建镜像
docker build -t loozb-front .

#判断容器是否存在，如果存在删除
if docker ps -a|grep -i loozb-front;then
   docker rm -f loozb-front
fi

#启动容器
docker run -p 81:80 --name loozb-front -d loozb-front