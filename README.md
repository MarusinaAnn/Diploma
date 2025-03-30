# ☁️ My Cloud — Облачное хранилище

> Дипломный проект по профессии **«Fullstack-разработчик на Python»**  
> Приложение позволяет загружать, скачивать, переименовывать, удалять файлы и управлять ими через красивый и удобный интерфейс.

<details>
<summary>🇬🇧 Click here for English version</summary>

## ☁️ My Cloud — Cloud Storage

> Final project for the course **"Fullstack Developer in Python"**  
> A cloud storage app where users can upload, download, rename, and manage their files with a clean and friendly interface.

### 🚀 Features

👤 For users:

- Registration with validation  
- Login / Logout  
- File upload with comments  
- Download, delete, rename files  
- Copy public link for external sharing

🛠 For admins:

- View user list  
- Delete users  
- Toggle admin rights  
- View files and stats for any user

### 🧱 Tech stack

#### Backend

- **Python 3.10+**
- **Django**
- **Django REST Framework**
- **PostgreSQL**
- Token-based authentication
- Local file storage (unique folder system per user)

#### Frontend

- **React 18**
- **TypeScript**
- **React Router 6**
- **Axios**
- **React Toastify** (toast notifications)

### 📦 Installation

#### 1. Backend

```bash
git clone https://github.com/your-username/mycloud-backend.git
cd mycloud-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# setup .env (example below)
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Example `.env`:

```env
SECRET_KEY=your_secret_key
DEBUG=True
POSTGRES_NAME=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

#### 2. Frontend

```bash
git clone https://github.com/your-username/mycloud-frontend.git
cd mycloud-frontend
npm install
npm run dev
```

> ⚠️ Make sure `.env` in frontend contains:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### 🌍 Deployment on Reg.ru

1. Install Docker & Docker Compose  
2. Configure `docker-compose.yml` with `web`, `db` and `nginx`  
3. Add `.env` and run: `docker-compose up --build -d`

### 🧪 Validation

- Username: latin letters, 4–20 characters  
- Email: must match email format  
- Password: at least 6 characters, 1 capital letter, 1 digit, 1 special symbol

### 📁 Project structure

```text
mycloud/
├── backend/
│   ├── manage.py
│   ├── mycloud/
│   └── storage/
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── api/
    └── public/
```

### ✅ Ready to go

- [x] All required features  
- [x] Admin & user support  
- [x] SPA with React  
- [x] Full README in RU & EN

### 📄 License

MIT — free to use and adapt.

</details>

---

## 🚀 Возможности

👤 Для пользователя:

- Регистрация с валидацией данных  
- Авторизация и выход  
- Загрузка файлов с комментарием  
- Просмотр, скачивание, удаление, переименование файлов  
- Копирование публичной ссылки для внешнего скачивания

🛠 Для администратора:

- Просмотр списка пользователей  
- Удаление пользователей  
- Назначение/снятие роли администратора  
- Просмотр файлов и статистики по каждому пользователю

## 🧱 Стек технологий

### Backend

- **Python 3.10+**
- **Django**
- **Django REST Framework**
- **PostgreSQL**
- Авторизация — Token-based
- Хранение файлов — локально, с уникальной системой путей

### Frontend

- **React 18**
- **TypeScript**
- **React Router 6**
- **Axios**
- **React Toastify** (всплывающие уведомления)

## 📦 Установка и запуск

### 1. Backend

```bash
git clone https://github.com/your-username/mycloud-backend.git
cd mycloud-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# настрой .env (пример ниже)
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Пример `.env`:

```env
SECRET_KEY=your_secret_key
DEBUG=True
POSTGRES_NAME=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### 2. Frontend

```bash
git clone https://github.com/your-username/mycloud-frontend.git
cd mycloud-frontend
npm install
npm run dev
```

> ⚠️ Убедись, что в `.env` (frontend) указан URL бэкенда:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

## 🌍 Развёртывание на Reg.ru

1. Установить Docker и Docker Compose  
2. Настроить `docker-compose.yml` с сервисами `web`, `db` и `nginx`  
3. Перенести `.env` и собрать образ: `docker-compose up --build -d`

## 🧪 Валидация данных

- Логин: латиница, 4–20 символов  
- Email: формат почты  
- Пароль: минимум 6 символов, 1 заглавная буква, цифра и спецсимвол

Ошибки отображаются в виде всплывающих уведомлений (toast).

## 📁 Структура проекта

```text
mycloud/
├── backend/
│   ├── manage.py
│   ├── mycloud/         # конфигурация Django
│   └── storage/         # бизнес-логика и модели
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── api/
    └── public/
```

## ✅ Готовность

- [x] Обязательный функционал  
- [x] Поддержка прав пользователей  
- [x] Удобный интерфейс SPA  
- [x] README на русском и английском

## 📄 Лицензия

MIT — можно использовать и адаптировать под свои нужды.