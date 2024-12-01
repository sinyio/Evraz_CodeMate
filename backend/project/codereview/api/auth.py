from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from ninja import Router
from ninja.errors import HttpError
from ninja.security import HttpBearer
from pydantic import BaseModel
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken

router = Router(tags=["auth"])


def make_password(data):
    try:
        validate_password(data)
    except ValidationError as e:
        raise HttpError(400, str(e))


# Схема для входа пользователя
class LoginSchema(BaseModel):
    username: str
    password: str


class RegisterSchema(BaseModel):
    username: str
    password: str


# Токен
class BearerAuth(HttpBearer):
    def authenticate(self, request, token):
        jwt_auth = JWTAuthentication()
        try:
            # Проверяем токен и получаем данные пользователя
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)
            return user
        except InvalidToken:
            # Если токен недействителен, возвращаем None
            return None


auth = BearerAuth()


# Вход и получение токена
@router.post("/auth/login")
def login(request, data: LoginSchema):
    try:
        user = User.objects.get(username=data.username)
        if check_password(data.password, user.password):
            refresh = RefreshToken.for_user(user)
            return {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        raise HttpError(401, "Invalid credentials")
    except User.DoesNotExist:
        raise HttpError(401, "User not found")


@router.post("/auth/register")
def register(request, data: RegisterSchema):
    # Проверяем, существует ли пользователь с таким именем
    if User.objects.filter(username=data.username).exists():
        raise HttpError(400, "Username is already taken")

    # Проверяем, существует ли пользователь с таким email
    # if User.objects.filter(email=data.email).exists():
    #     raise HttpError(400, "Email is already registered")

    # Создаем нового пользователя
    user = User.objects.create(
        username=data.username,
        password=make_password(data.password),
    )

    refresh = RefreshToken.for_user(user)
    return {
        "message": "User registered successfully",
        "user_id": user.id,
        "access_token": str(refresh.access_token),
        "refresh_token": str(refresh),
    }


# Защищенный эндпоинт
@router.get("/secure-data", auth=auth)
def secure_data(request):
    return {"message": f"Hello, {request.auth.username}!"}
