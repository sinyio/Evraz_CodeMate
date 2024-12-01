import os
import time
from datetime import datetime

import pytz
from django.conf import settings
from django.http import FileResponse
from ninja import File, Router
from ninja.files import UploadedFile as NinjaUploadedFile

from codereview.models import UploadedFile
from codereview.utilitis import analyze_project

from .auth import BearerAuth


def get_current_time_formatted():
    # Указываем временную зону UTC+3
    timezone = pytz.timezone("Europe/Moscow")  # UTC+3 обычно соответствует Москве
    now = datetime.now(timezone)
    # Форматируем дату и время
    formatted_time = now.strftime("%d.%m.%Y %H:%M:%S UTC%z")
    # Преобразуем смещение UTC+0300 в формат UTC+3
    formatted_time = formatted_time.replace("UTC+0300", "UTC+3")
    return formatted_time


router = Router(tags=["file"])
auth = BearerAuth()


# Эндпоинт для загрузки файла
@router.post("/upload")
def upload_file(request, file: NinjaUploadedFile = File(...)):
    # Сохраняем файл в базу данных и на сервер
    UploadedFile.objects.create(file=file)
    file_path_uploads = os.path.join(settings.MEDIA_ROOT, f"uploads/{file.name}")
    file_path_resulte = os.path.join(
        settings.MEDIA_ROOT, f"results/{file.name.split('.')[0] + '.pdf'}"
    )
    current_time = get_current_time_formatted()
    start_time = time.time()

    analyze_project(
        uploaded_file_path=file_path_uploads,
        project_name=file.name,
        last_modified=current_time,
        output_pdf_path=file_path_resulte,
    )
    end_time = time.time()

    print(end_time - start_time)
    # instance.delete(instance.id)
    return FileResponse(
        open(file_path_resulte, "rb"),
        as_attachment=True,
        filename=os.path.basename(file_path_resulte),
    )

    # return {"message": "File uploaded successfully", "file_id": instance.id}
