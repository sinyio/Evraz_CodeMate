# -*- coding: utf-8 -*-

# !# Установка необходимых пакетов
#!pip install requests zipfile36 pypdf2 weasyprint rarfile py7zr

# Также необходимо установить утилиту unrar для обработки RAR-архивов
# Для Colab или других Debian-подобных систем
#!apt-get update
#!apt-get install -y unrar

import json
import os
import random
import re
import tempfile
import time
import zipfile
from datetime import datetime

import py7zr
import rarfile
import requests
from weasyprint import HTML


def analyze_and_generate_report(
    uploaded_file_path,
    project_name=None,
    last_modified="01.01.2024 00:00:00 UTC+3",
    rules="""
### Python
- **Организация кода:** код должен быть структурирован согласно принципам монорепозитория, с использованием .gitignore и .editorconfig файлов.
- **Использование стандартных инструментов и библиотек:** применение популярных и поддерживаемых версий пакетов, таких как Pylint, Flake8, Black.
- **Проверка и тестирование:** наличие тестов, как юнит тестов, так и интеграционных тестов.
- **Логирование и мониторинг:** корректное использование модуля logging и форматов записи логов.
- **Аутентификация и авторизация:** проверка правильности обработки JWT токенов и защиты доступа к ресурсам.
- **Соответствие стилистическим нормам:** соблюдение правил оформления кода по PEP8 и наличие документации по PEP256 и PEP257.
- **Оптимизация производительности:** использование эффективных алгоритмов и структур данных, особенно при работе с большими объемами данных.
""",
    output_pdf_path=None,
):
    """
    Анализирует загруженный архив с Python-кодом и генерирует PDF-отчет.

    :param uploaded_file_path: Путь к загруженному архиву (ZIP, RAR, 7z).
    :param project_name: Название проекта. Если не задано, используется имя архива.
    :param last_modified: Дата последнего изменения проекта.
    :param rules: Правила анализа кода.
    :param output_pdf_path: Путь для сохранения PDF-отчета. Если не задано, сохраняется в той же директории, что и архив.
    """

    # ==============================
    # 1. Настройка логирования
    # ==============================
    print("Начало анализа кода.")
    # ==============================
    # 2. Функции для обработки файлов
    # ==============================

    def extract_files(file_path, extract_to):
        """
        Извлекает все файлы из архива (ZIP, RAR, 7z) в указанную директорию.
        """
        try:
            if zipfile.is_zipfile(file_path):
                with zipfile.ZipFile(file_path, "r") as zip_ref:
                    zip_ref.extractall(extract_to)
                print(f"Файлы успешно извлечены из ZIP-архива: {file_path}")
            elif rarfile.is_rarfile(file_path):
                with rarfile.RarFile(file_path) as rar_ref:
                    rar_ref.extractall(extract_to)
                print(f"Файлы успешно извлечены из RAR-архива: {file_path}")
            elif file_path.lower().endswith(".7z"):
                with py7zr.SevenZipFile(file_path, mode="r") as seven_z:
                    seven_z.extractall(path=extract_to)
                print(f"Файлы успешно извлечены из 7z-архива: {file_path}")
            else:
                print(f"Не поддерживаемый формат архива: {file_path}")
        except zipfile.BadZipFile:
            print(f"Некорректный ZIP-архив: {file_path}")
        except rarfile.RarCannotExec as e:
            print(
                f"Ошибка при обработке RAR-архива (возможно, не установлен unrar): {e}"
            )
        except py7zr.exceptions.Bad7zFile:
            print(f"Некорректный 7z-архив: {file_path}")
        except Exception as e:
            print(f"Ошибка при извлечении файлов: {e}")

    def get_python_files(directory, extensions=[".py"]):
        """
        Рекурсивно находит все Python-файлы в указанной директории.
        Исключает временные файлы и папки, такие как __MACOSX.
        """
        python_files = []
        for root, _, files in os.walk(directory):
            for file in files:
                if file.startswith(".") or "__MACOSX" in root:
                    continue  # Пропустить временные файлы и каталоги
                if any(file.endswith(ext) for ext in extensions):
                    python_files.append(os.path.join(root, file))
        print(f"Найдено {len(python_files)} Python-файлов для анализа")
        return python_files

    # ==============================
    # 3. Интеграция с моделью через API
    # ==============================

    API_KEY = os.getenv("API_KEY", "BfC7ItnGiGk3VoVEAQTKtJHqp8jyp8el")
    MODEL_NAME = "mistral-nemo-instruct-2407"
    API_URL = "http://84.201.152.196:8020/v1/completions"

    HEADERS = {"Authorization": API_KEY, "Content-Type": "application/json"}

    def generate_prompt(rules, code):
        """
        Генерирует запрос для модели с предоставленными правилами и кодом.
        """
        prompt = (
            "Вы являетесь помощником для проверки Python-кода на соответствие корпоративным стандартам.\n"
            f"Стандарты:\n{rules}\n\n"
            "Пожалуйста, проанализируйте следующий код и верните результаты в формате JSON со следующими полями:\n"
            "1. errors: список найденных ошибок\n"
            "2. architecture_violations: список архитектурных нарушений\n"
            "3. naming_issues: список проблем с наименованиями\n\n"
            f"```python\n{code}\n```\n\n"
            "Ответ должен содержать только JSON без каких-либо дополнительных текстов или форматирования."
        )
        return prompt

    def send_request(prompt, max_tokens=1024, temperature=0.3):
        """
        Отправляет запрос к модели и возвращает ответ.
        """
        data = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": "Отвечай на русском языке."},
                {"role": "user", "content": prompt},
            ],
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        print(f"Отправляем запрос к модели: {json.dumps(data, ensure_ascii=False)}")

        try:
            response = requests.post(API_URL, headers=HEADERS, data=json.dumps(data))

            # Логирование статуса и текста ответа для отладки
            print(f"Получен ответ: {response.status_code} - {response.text}")

            # Проверка статуса ответа
            if response.status_code != 200:
                print(f"Ошибка: {response.status_code} - {response.text}")
                return None

            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Ошибка при запросе к модели: {e}")
            return None

    def send_request_with_retries(prompt, max_tokens=1024, temperature=0.3, retries=3):
        """
        Отправляет запрос к модели с повторными попытками при ошибках.
        """
        for attempt in range(retries):
            response = send_request(prompt, max_tokens, temperature)
            if response:
                return response
            else:
                wait = (2**attempt) + random.uniform(0, 1)
                print(f"Повторная попытка через {wait:.2f} секунд...")
                time.sleep(wait)
        print("Не удалось получить ответ после нескольких попыток.")
        return None

    def process_response(response):
        """
        Обрабатывает ответ от модели и возвращает структурированные данные.
        """
        if "error" in response:
            print(f"Ошибка от модели: {response['error']['message']}")
            return None
        try:
            content = response["choices"][0]["message"]["content"]
            if not content.strip():
                print("Пустой ответ от модели.")
                return None

            # Удаление блоков кода Markdown
            json_match = re.search(r"```json\s*(\{.*\})\s*```", content, re.DOTALL)
            if json_match:
                json_str = json_match.group(1)
            else:
                # Если блок кода не найден, пробуем взять весь контент
                json_str = content.strip()

            # Парсим JSON
            analysis = json.loads(json_str)
            return analysis
        except (KeyError, IndexError, json.JSONDecodeError) as e:
            print(f"Неверный формат ответа от модели: {e}")
            print(f"Содержимое ответа: {response.get('choices', [])}")
            return None

    # ==============================
    # 4. Генерация и сохранение отчетов
    # ==============================

    def generate_code_review_report(project_name, last_modified, analysis_data):
        """
        Генерирует HTML-содержимое отчета на основе предоставленных данных анализа.
        """
        report_date = datetime.now().strftime("%d.%m.%Y %H:%M:%S UTC+3")

        # Расчёт количества ошибок
        total_errors = len(analysis_data.get("errors", []))
        total_architecture_violations = len(
            analysis_data.get("architecture_violations", [])
        )
        total_naming_issues = len(analysis_data.get("naming_issues", []))

        # Генерация HTML-отчета
        html_content = f"""
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Отчет по ревью кода</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 40px; }}
                h1 {{ text-align: center; }}
                h2 {{ color: #2e6c80; }}
                h3 {{ color: #2e6c80; }}
                .error, .architecture, .naming {{ margin-bottom: 20px; }}
                .error strong, .architecture strong, .naming strong {{ color: #d9534f; }}
                pre {{ background-color: #f4f4f4; padding: 10px; white-space: pre-wrap; }}
                .suggestion {{ color: green; }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }}
                th, td {{
                    border: 1px solid #ddd;
                    padding: 8px;
                }}
                th {{
                    background-color: #f2f2f2;
                    text-align: left;
                }}
            </style>
        </head>
        <body>
            <h1>Анализ проекта {project_name}</h1>
            <h2>Дата анализа: {report_date}</h2>
            <h2>Дата последнего изменения проекта: {last_modified}</h2>
            <h2>Общее количество ошибок: {total_errors}</h2>
            <h3>Архитектурных нарушений: {total_architecture_violations}</h3>
            <h3>Несоответствий стандартам: {total_naming_issues}</h3>

            <h2>Ошибки и нарушения</h2>
        """

        # Добавление архитектурных нарушений
        architecture_violations = analysis_data.get("architecture_violations", [])
        if architecture_violations:
            html_content += "<h3>Архитектурные нарушения</h3>"
            for violation in architecture_violations:
                if isinstance(
                    violation, dict
                ):  # Проверяем, что violation является dict
                    file_info = violation.get("file", "Не указано")
                    line_info = violation.get("line", "Не указано")
                    description = violation.get("description", "Нет описания")
                    suggestion = violation.get(
                        "suggestion", "Нет предложенного исправления"
                    )
                    html_content += f"""
                    <div class="architecture">
                        <strong>{file_info} (номер строки: {line_info})</strong><br>
                        <span>{description}</span><br>
                        <span class="suggestion">Предложенное исправление: {suggestion}</span>
                    </div>
                    """
                else:
                    # Если нарушение не имеет ожидаемого типа, просто выводим сообщение
                    html_content += f"""
                    <div class="architecture">
                        <strong>Ошибка формы данных:</strong><br>
                        <span>{violation}</span>
                    </div>
                    """

        # Добавление проблем с наименованиями
        naming_issues = analysis_data.get("naming_issues", [])
        if naming_issues:
            html_content += "<h3>Некорректные наименования</h3>"
            for issue in naming_issues:
                if isinstance(issue, dict):  # Проверяем, что issue является dict
                    file_info = issue.get("file", "Не указано")
                    line_info = issue.get("line", "Не указано")
                    description = issue.get("description", "Нет описания")
                    suggestion = issue.get(
                        "suggestion", "Нет предложенного исправления"
                    )
                    html_content += f"""
                    <div class="naming">
                        <strong>{file_info} (номер строки: {line_info})</strong><br>
                        <span>{description}</span><br>
                        <span class="suggestion">Предложенное исправление: {suggestion}</span>
                    </div>
                    """
                else:
                    html_content += f"""
                    <div class="naming">
                        <strong>Ошибка формы данных:</strong><br>
                        <span>{issue}</span>
                    </div>
                    """

        # Добавление общих ошибок
        errors = analysis_data.get("errors", [])
        if errors:
            html_content += "<h3>Общие ошибки</h3>"
            for error in errors:
                if isinstance(error, dict):  # Проверяем, что error является dict
                    file_info = error.get("file", "Не указано")
                    line_info = error.get("line", "Не указано")
                    description = error.get("description", "Нет описания")
                    suggestion = error.get(
                        "suggestion", "Нет предложенного исправления"
                    )
                    html_content += f"""
                    <div class="error">
                        <strong>{file_info} (номер строки: {line_info})</strong><br>
                        <span>{description}</span><br>
                        <span class="suggestion">Предложенное исправление: {suggestion}</span>
                    </div>
                    """
                else:
                    html_content += f"""
                    <div class="error">
                        <strong>Ошибка формы данных:</strong><br>
                        <span>{error}</span>
                    </div>
                    """

        html_content += "</body></html>"

        return html_content

    def create_pdf_report(html_content, output_path):
        """
        Создает PDF-отчет на основе HTML-содержимого.
        """
        try:
            HTML(string=html_content).write_pdf(output_path)
            print(f"Отчет успешно создан: {output_path}")
        except Exception as e:
            print(f"Ошибка при создании PDF: {e}")

    # ==============================
    # 5. Проверка доступности API
    # ==============================

    def check_api():
        """
        Проверяет доступность API и список доступных моделей.
        """
        try:
            # Приветственное сообщение
            resp = requests.get(
                "http://84.201.152.196:8020/v1/", headers={"Authorization": API_KEY}
            )
            print(f"Приветственное сообщение API: {resp.status_code} - {resp.text}")

            # Список доступных моделей
            resp = requests.get(
                "http://84.201.152.196:8020/v1/models",
                headers={"Authorization": API_KEY},
            )
            print(f"Список доступных моделей: {resp.status_code} - {resp.text}")

        except requests.exceptions.RequestException as e:
            print(f"Ошибка при проверке API: {e}")

    # ==============================
    # 6. Основная логика обработки
    # ==============================

    try:
        with tempfile.TemporaryDirectory() as tmpdirname:
            print(f"Создан временный каталог: {tmpdirname}")
            # Извлечение файлов
            extract_files(uploaded_file_path, tmpdirname)

            # Определение имени проекта
            archive_base_name = os.path.splitext(os.path.basename(uploaded_file_path))[
                0
            ]
            if archive_base_name.lower().endswith(".tar"):
                archive_base_name = os.path.splitext(archive_base_name)[0]

            if not project_name:
                project_name = archive_base_name

            # Определение имени PDF-отчета
            if not output_pdf_path:
                output_pdf_path = os.path.join(
                    os.path.dirname(uploaded_file_path),
                    f"{archive_base_name}_code_analysis_report.pdf",
                )

            # Поиск Python-файлов
            python_files = get_python_files(tmpdirname)
            if not python_files:
                print("Не найдено файлов с Python-кодом для анализа.")
                return

            # Инициализация структур для сбора данных анализа
            analysis_summary = {
                "errors": [],
                "architecture_violations": [],
                "naming_issues": [],
            }

            for file in python_files:
                try:
                    with open(file, "r", encoding="utf-8", errors="ignore") as f:
                        code = f.read()
                    print(f"Анализируем файл: {file}")
                except Exception as e:
                    print(f"Ошибка при чтении файла {file}: {e}")
                    continue

                prompt = generate_prompt(rules, code)
                response = send_request_with_retries(
                    prompt, max_tokens=1024, temperature=0.3
                )
                if response:
                    analysis = process_response(response)
                    if analysis:
                        # Объединяем результаты анализа
                        analysis_summary["errors"].extend(analysis.get("errors", []))
                        analysis_summary["architecture_violations"].extend(
                            analysis.get("architecture_violations", [])
                        )
                        analysis_summary["naming_issues"].extend(
                            analysis.get("naming_issues", [])
                        )
                    else:
                        print(f"Ошибка при анализе файла: {file}")
                else:
                    print(f"Ошибка при отправке запроса для файла: {file}")

                # Учитываем ограничение токенов и скорость
                time.sleep(0.5)  # Задержка между запросами

            # Генерация HTML-отчета
            html_report = generate_code_review_report(
                project_name, last_modified, analysis_summary
            )

            # Создание PDF
            create_pdf_report(html_report, output_pdf_path)

    except Exception as e:
        print(f"Неожиданная ошибка: {e}")

    print("Анализ завершен.")

    # ==============================
    # 7. Дополнительные действия (опционально)
    # ==============================

    # Проверка доступности API перед основной обработкой (можно переместить выше при необходимости)
    check_api()


# ==============================
# Пример использования функции
# ==============================

# if __name__ == "__main__":
# Путь к загруженному файлу (ZIP, RAR или 7z)
# UPLOADED_FILE = (
#     "/content/Flask-PostgreSQL-API-Seed-master.rar"  # Замените на реальный путь
# )


# Параметры проекта
# PROJECT_NAME = None  # Если None, используется имя архива
# LAST_MODIFIED = (
#     "01.01.2024 00:00:00 UTC+3"  # Замените на актуальную дату последнего изменения
# )
def analyze_project(uploaded_file_path, project_name, last_modified, output_pdf_path):
    LAST_MODIFIED = last_modified
    PROJECT_NAME = project_name
    UPLOADED_FILE = uploaded_file_path
    OUTPUT_PDF = output_pdf_path
    # Правила анализа (можно изменить при необходимости)
    RULES = """
    ### Python
    - **Организация кода:** код должен быть структурирован согласно принципам монорепозитория, с использованием .gitignore и .editorconfig файлов.
    - **Использование стандартных инструментов и библиотек:** применение популярных и поддерживаемых версий пакетов, таких как Pylint, Flake8, Black.
    - **Проверка и тестирование:** наличие тестов, как юнит тестов, так и интеграционных тестов.
    - **Логирование и мониторинг:** корректное использование модуля logging и форматов записи логов.
    - **Аутентификация и авторизация:** проверка правильности обработки JWT токенов и защиты доступа к ресурсам.
    - **Соответствие стилистическим нормам:** соблюдение правил оформления кода по PEP8 и наличие документации по PEP256 и PEP257.
    - **Оптимизация производительности:** использование эффективных алгоритмов и структур данных, особенно при работе с большими объемами данных.
    """

    # Генерация имени PDF-отчета на основе имени архива
    archive_base_name = os.path.splitext(os.path.basename(UPLOADED_FILE))[0]
    if archive_base_name.lower().endswith(".tar"):
        archive_base_name = os.path.splitext(archive_base_name)[0]

    # OUTPUT_PDF = os.path.join(
    #     os.path.dirname(UPLOADED_FILE), f"{archive_base_name}_code_analysis_report.pdf"
    # )

    # Вызов функции анализа и генерации отчета
    analyze_and_generate_report(
        uploaded_file_path=UPLOADED_FILE,
        project_name=PROJECT_NAME,
        last_modified=LAST_MODIFIED,
        rules=RULES,
        output_pdf_path=OUTPUT_PDF,
    )
