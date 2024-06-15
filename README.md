<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Tasks API/Run dev

1. Clone the project
2. ```npm install```
3. Rename file ```.env.template``` to ```.env```
4. Start the database 
```
docker-compose up -d
```

6. Start the project: ```npm run start:dev```


# Tasks API/Run prod-Docker

1. Clone the project
2. Rename file ```.env.template``` to ```.env```
3. Run docker-compose.prod.yaml 
    ```
    docker-compose -f docker-compose.prod.yaml --env-file .env up --build
    ```


# Notes
* Swagger documentation
  ```
  http://localhost:3000/api
  ```
