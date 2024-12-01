![CodeMate Logo](https://github.com/user-attachments/assets/538afd93-3de4-443c-ad16-33a1fb6db8a2)

# CodeMate

CodeMate — это инструмент для анализа отдельных файлов и целых проектов на их соответствие правилам написания кода и принятым соглашениям.

## Особенности

- **Автоматическая проверка кода**: анализирует Python-файлы на соответствие стандартам.
- **Поддержка проектов**: обрабатывает архивы проектов, выделяя Python-файлы.
- **Генерация отчётов**: создаёт отчёты в формате PDF или HTML.
- **Дружественный интерфейс**: простой и удобный интерфейс для разработчиков.

---

## Установка

1. **Клонируйте репозиторий**:

   ```bash
   git clone https://github.com/your-username/codemate.git
   ```

2. **Запуск через Docker**

   ```bash
   docker-compose -f docker-compose\backend.yaml -f docker-compose\frondend.yaml --env-file  backend\.env up --build -d
   ```

   доступ к проекту будет по ссылке [http://localhost:8000](http://localhost:8000)

3. **Пользователь для проверки**
   User: user
   Password: pass
