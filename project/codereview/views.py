from ninja import NinjaAPI

from codereview.api.auth import router as auth_router
from codereview.api.files import router as files_router

api = NinjaAPI()
api.add_router("/auth", auth_router)
api.add_router("/file", files_router)


@api.get("/ping")
def ping(request):
    return "pong"
