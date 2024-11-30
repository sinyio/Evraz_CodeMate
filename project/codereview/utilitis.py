def analyze_and_generate_report(
    uploaded_file_path="/content/luncher-api-master.zip",
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
    Анализирует загруженный ZIP-файл с Python-кодом и генерирует PDF-отчет.

    :param uploaded_file_path: Путь к загруженному ZIP-файлу.
    :param project_name: Название проекта. Если не задано, используется имя ZIP-файла.
    :param last_modified: Дата последнего изменения проекта.
    :param rules: Правила анализа кода.
    :param output_pdf_path: Путь для сохранения PDF-отчета. Если не задано, сохраняется в той же директории, что и ZIP-файл.
    """
    import json
    import logging
    import os
    import re
    import tempfile
    import time
    import zipfile
    from datetime import datetime

    import requests
    from weasyprint import HTML

    # Установка необходимых пакетов
    try:
        import pip

        required_packages = ["requests", "zipfile36", "pypdf2", "weasyprint"]
        for package in required_packages:
            pip.main(["install", package])
    except Exception as e:
        print(f"Ошибка при установке пакетов: {e}")
        return

    # Настройка логирования
    logging.basicConfig(
        filename="code_analysis.log",
        level=logging.INFO,
        format="%(asctime)s:%(levelname)s:%(message)s",
    )
    logging.info("Начало анализа кода.")

    # Функция для извлечения ZIP-архива
    def extract_files(file_path, extract_to):
        try:
            with zipfile.ZipFile(file_path, "r") as zip_ref:
                zip_ref.extractall(extract_to)
            logging.info(f"Файлы успешно извлечены из {file_path}")
        except zipfile.BadZipFile:
            logging.error(f"Некорректный ZIP-архив: {file_path}")
        except Exception as e:
            logging.error(f"Ошибка при извлечении файлов: {e}")

    # Функция для поиска Python-файлов
    def get_python_files(directory, extensions=[".py"]):
        python_files = []
        for root, _, files in os.walk(directory):
            for file in files:
                if file.startswith(".") or "__MACOSX" in root:
                    continue
                if any(file.endswith(ext) for ext in extensions):
                    python_files.append(os.path.join(root, file))
        logging.info(f"Найдено {len(python_files)} Python-файлов для анализа")
        return python_files

    # Настройка API
    API_KEY = os.getenv("API_KEY", "BfC7ItnGiGk3VoVEAQTKtJHqp8jyp8el")
    MODEL_NAME = "mistral-nemo-instruct-2407"
    API_URL = "http://84.201.152.196:8020/v1/completions"
    HEADERS = {"Authorization": API_KEY, "Content-Type": "application/json"}

    # Функция для генерации запроса к модели
    def generate_prompt(rules, code):
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

    # Функция для отправки запроса к модели
    def send_request(prompt, max_tokens=1024, temperature=0.3):
        data = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": "Отвечай на русском языке."},
                {"role": "user", "content": prompt},
            ],
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        logging.info(
            f"Отправляем запрос к модели: {json.dumps(data, ensure_ascii=False)}"
        )

        try:
            response = requests.post(API_URL, headers=HEADERS, data=json.dumps(data))
            logging.info(f"Получен ответ: {response.status_code} - {response.text}")

            if response.status_code != 200:
                logging.error(f"Ошибка: {response.status_code} - {response.text}")
                return None

            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"Ошибка при запросе к модели: {e}")
            return None

    # Функция для обработки ответа от модели
    def process_response(response):
        if "error" in response:
            logging.error(f"Ошибка от модели: {response['error']['message']}")
            return None
        try:
            content = response["choices"][0]["message"]["content"]
            if not content.strip():
                logging.error("Пустой ответ от модели.")
                return None

            json_match = re.search(r"```json\s*(\{.*\})\s*```", content, re.DOTALL)
            if json_match:
                json_str = json_match.group(1)
            else:
                json_str = content.strip()

            analysis = json.loads(json_str)
            return analysis
        except (KeyError, IndexError, json.JSONDecodeError) as e:
            logging.error(f"Неверный формат ответа от модели: {e}")
            logging.error(f"Содержимое ответа: {response.get('choices', [])}")
            return None

    # Функция для генерации HTML-отчета
    def generate_code_review_report(project_name, last_modified, analysis_data):
        report_date = datetime.now().strftime("%d.%m.%Y %H:%M:%S UTC+3")
        total_errors = len(analysis_data.get("errors", []))
        total_architecture_violations = len(
            analysis_data.get("architecture_violations", [])
        )
        total_naming_issues = len(analysis_data.get("naming_issues", []))

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

        # Архитектурные нарушения
        architecture_violations = analysis_data.get("architecture_violations", [])
        if architecture_violations:
            html_content += "<h3>Архитектурные нарушения</h3>"
            for violation in architecture_violations:
                if isinstance(violation, dict):
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
                    html_content += f"""
                    <div class="architecture">
                        <strong>Ошибка формы данных:</strong><br>
                        <span>{violation}</span>
                    </div>
                    """

        # Проблемы с наименованиями
        naming_issues = analysis_data.get("naming_issues", [])
        if naming_issues:
            html_content += "<h3>Некорректные наименования</h3>"
            for issue in naming_issues:
                if isinstance(issue, dict):
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

        # Общие ошибки
        errors = analysis_data.get("errors", [])
        if errors:
            html_content += "<h3>Общие ошибки</h3>"
            for error in errors:
                if isinstance(error, dict):
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

    # Функция для создания PDF из HTML
    def create_pdf_report(html_content, output_path):
        try:
            HTML(string=html_content).write_pdf(output_path)
            logging.info(f"Отчет успешно создан: {output_path}")
        except Exception as e:
            logging.error(f"Ошибка при создании PDF: {e}")

    # Проверка доступности API
    def check_api():
        try:
            resp = requests.get(
                "http://84.201.152.196:8020/v1/", headers={"Authorization": API_KEY}
            )
            logging.info(
                f"Приветственное сообщение API: {resp.status_code} - {resp.text}"
            )

            resp = requests.get(
                "http://84.201.152.196:8020/v1/models",
                headers={"Authorization": API_KEY},
            )
            logging.info(f"Список доступных моделей: {resp.status_code} - {resp.text}")

        except requests.exceptions.RequestException as e:
            logging.error(f"Ошибка при проверке API: {e}")

    # Основная логика обработки
    try:
        with tempfile.TemporaryDirectory() as tmpdirname:
            # Извлечение файлов
            extract_files(uploaded_file_path, tmpdirname)

            # Определение имени проекта
            zip_base_name = os.path.splitext(os.path.basename(uploaded_file_path))[0]
            if not project_name:
                project_name = zip_base_name

            # Определение имени PDF-отчета
            if not output_pdf_path:
                output_pdf_path = os.path.join(
                    os.path.dirname(uploaded_file_path),
                    f"{zip_base_name}_code_analysis_report.pdf",
                )

            # Поиск Python-файлов
            python_files = get_python_files(tmpdirname)
            if not python_files:
                logging.error("Не найдено файлов с Python-кодом для анализа.")
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
                    logging.info(f"Анализируем файл: {file}")
                except Exception as e:
                    logging.error(f"Ошибка при чтении файла {file}: {e}")
                    continue

                prompt = generate_prompt(rules, code)
                response = send_request(prompt, max_tokens=1024, temperature=0.3)
                if response:
                    analysis = process_response(response)
                    if analysis:
                        analysis_summary["errors"].extend(analysis.get("errors", []))
                        analysis_summary["architecture_violations"].extend(
                            analysis.get("architecture_violations", [])
                        )
                        analysis_summary["naming_issues"].extend(
                            analysis.get("naming_issues", [])
                        )
                    else:
                        logging.error(f"Ошибка при анализе файла: {file}")
                else:
                    logging.error(f"Ошибка при отправке запроса для файла: {file}")

                time.sleep(0.04)  # Ограничение скорости запросов

            # Генерация HTML-отчета
            html_report = generate_code_review_report(
                project_name, last_modified, analysis_summary
            )

            # Создание PDF
            create_pdf_report(html_report, output_pdf_path)

    except Exception as e:
        logging.error(f"Неожиданная ошибка: {e}")

    logging.info("Анализ завершен.")
