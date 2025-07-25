FROM node:22-alpine

# bcrypt 컴파일을 위한 빌드 도구 설치
RUN apk add --no-cache python3 make g++

# 컨테이너 내에서 /usr/src/app 디렉토리를 작업 디렉토리로 설정
WORKDIR /usr/src/app

# package.json 파일들을 작업 디렉토리로 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 빌드 도구 제거 (이미지 크기 최적화)
RUN apk del python3 make g++

# 애플리케이션 소스 파일들을 작업 디렉토리로 복사
COPY . .

# 컨테이너가 노출할 포트
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "app.js"]