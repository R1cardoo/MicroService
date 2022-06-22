# Use an existing docker image as a base
FROM node

# 将当前目录下所有文件 复制到容器的目录里
WORKDIR /usr/app
COPY ./ /usr/app
# Download and install a dependency
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

# Tell the image what to do when it starts as a container
CMD ["npm", "start"]