from pydantic import BaseModel, EmailStr


class SettingBase(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: str

    jobTitle: str
    department: str
    timezone: str

    emailNotifications: bool
    smsNotifications: bool
    pushNotifications: bool

    theme: str
    language: str


class SettingCreate(SettingBase):
    pass


class SettingUpdate(SettingBase):
    pass


class SettingResponse(SettingBase):
    id: str

    class Config:
        from_attributes = True