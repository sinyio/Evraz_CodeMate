import os
from time import sleep

from django.http import FileResponse
from ninja import File, Router
from ninja.files import UploadedFile as NinjaUploadedFile

from codereview.models import UploadedFile

# from codereview.utilitis import
from .auth import BearerAuth

router = Router(tags=["file"])
auth = BearerAuth()


# Эндпоинт для загрузки файла
@router.post("/upload", auth=auth)
def upload_file(request, file: NinjaUploadedFile = File(...)):
    # Сохраняем файл в базу данных и на сервер
    instance = UploadedFile.objects.create(file=file)
    sleep(100)
    # return FileResponse(
    #     open(file_path, "rb"),
    #     as_attachment=True,
    #     filename=os.path.basename(file_path),
    # )
    return {"message": "File uploaded successfully", "file_id": instance.id}


# Эндпоинт для скачивания файла по ID
@router.get("/download/{file_id}", auth=auth)
def download_file(request, file_id: int):
    try:
        file_instance = UploadedFile.objects.get(id=file_id)
        file_path = file_instance.file.path
        return FileResponse(
            open(file_path, "rb"),
            as_attachment=True,
            filename=os.path.basename(file_path),
        )
    except UploadedFile.DoesNotExist:
        return {"error": "File not found"}
