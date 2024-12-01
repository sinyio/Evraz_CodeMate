![CodeMate Logo](https://github.com/user-attachments/assets/538afd93-3de4-443c-ad16-33a1fb6db8a2)

# CodeMate

CodeMate — это инструмент для анализа отдельных файлов и целых проектов на их соответствие правилам написания кода и принятым соглашениям.

## Особенности

- **Временные затраты**: Проверка кода занимает больше времени, чем его написание
- **Неэффективность ручной проверки**: Увеличение числа проверяющих не всегда улучшает качество проверки структуры.
- **Сложность структуры**: Ужесточение правил усложняет анализ структуры кода

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
   User: rer
   Password: 123

## Документация

Документацию можно посмотреть по ссылке: https://www.figma.com/design/HmYYASgEL4XWwCc6krjSuv/CODEMATE?node-id=2154-2&node-type=canvas&t=1OmWXwhH4zpbnvEw-0
