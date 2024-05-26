# Проект (Frontend + Backend + DB)

## Описание

Этот проект включает в себя фронтенд, бэкенд и базу данных MongoDB. Бэкенд разработан на Spring Boot, фронтенд на React.

## Запуск проекта

### Требования

- Docker
- Docker Compose

### Шаги для запуска

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/denis-svintsov/docker.git
    cd docker
    ```

2. Сделайте скрипты исполняемыми:

    ```bash
    chmod +x build.sh run.sh
    ```

3. Запустите Docker

4. Постройте Docker-образы:

    ```bash
    ./build.sh
    ```

5. Запустите проект с помощью Docker Compose:

    ```bash
    ./run.sh
    ```

5. Откройте браузер и перейдите по адресу [http://localhost:80](http://localhost:80) для фронтенда и [http://localhost:8080](http://localhost:8080) для бэкенда.

### Доступ к системе

- Фронтенд доступен по адресу: [http://localhost:80](http://localhost:80)
- Бэкенд доступен по адресу: [http://localhost:8080](http://localhost:8080)
- MongoDB доступен по адресу: `mongodb://localhost:27017`

## Структура репозитория

- `/backend` - исходный код бэкенда
- `/frontend` - исходный код фронтенда
- `docker-compose.yml` - файл для запуска всех сервисов
- `.gitlab-ci.yml` - файл для CI/CD в GitLab
- `build.sh` - скрипт для сборки проекта
- `run.sh` - скрипт для запуска проекта

## Примечания

- MongoDB используется для хранения данных и доступна на порту `27017`.

