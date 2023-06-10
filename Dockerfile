# # install dependencies
# FROM node:16-buster-slim as worker
# ENV WORK_DIR=/app
# WORKDIR ${WORK_DIR}
# COPY package.json ./
# COPY yarn.lock  ./
# RUN yarn config set registry http://39.104.13.111:4873/
# RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile

# ## build package
# FROM node:16-buster-slim as builder
# ENV WORK_DIR=/app
# WORKDIR ${WORK_DIR}
# COPY . ${WORK_DIR}
# COPY package.json ./
# COPY yarn.lock  ./
# COPY vite.config.ts ./
# COPY --from=worker ${WORK_DIR}/node_modules ./node_modules
# RUN NODE_OPTIONS="--max-old-space-size=8192" yarn build

# # deploy package
# FROM nginx:mainline-alpine
# ENV WORK_DIR=/app
# COPY --from=builder ${WORK_DIR}/dist /usr/share/nginx/html
# COPY --from=builder ${WORK_DIR}/nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder ${WORK_DIR}/nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM --platform=linux/arm64/v8 node
FROM node

ADD dist/ambiences.config.json /usr/share/nginx/html

# # 将当期目录下的文件拷贝到linux系统的app文件夹下
# COPY --from=build ./dist ./lib
# FROM --platform=linux/arm64/v8 nginx
FROM  nginx

ADD dist /usr/share/nginx/html

ADD nginx/default.conf /etc/nginx/conf.d/default.conf

# 暴露docker容器的80端口
EXPOSE 80
