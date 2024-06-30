
FROM mongo:4.4


ENV MONGO_INITDB_ROOT_USERNAME=mestodb
ENV MONGO_INITDB_ROOT_PASSWORD=DEFAULT_SECRET_KEY

# Откройте порт 27017
EXPOSE 27017


CMD ["mongod"]



# docker build -t my-mongo-image .
# docker run  --name my-mongo-container -d my-mongo-image

# docker run -d -p 27017:27017 --name my-mongo-container my-mongo-image