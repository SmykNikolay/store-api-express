
FROM mongo:latest


ENV MONGO_INITDB_ROOT_USERNAME=mongoadmin
ENV MONGO_INITDB_ROOT_PASSWORD=secret

# Откройте порт 27017
EXPOSE 27017


CMD ["mongod"]