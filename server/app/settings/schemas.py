from pydantic import BaseModel, EmailStr, Field, ConfigDict


class ProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    department: str | None = None
    role: str


class ProfileUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    department: str | None = None


class PasswordChangeRequest(BaseModel):
    currentPassword: str
    newPassword: str = Field(min_length=8)


class NotificationPreferencesResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    emailEnabled: bool = Field(validation_alias="email_enabled")
    smsEnabled: bool = Field(validation_alias="sms_enabled")
    inAppEnabled: bool = Field(validation_alias="in_app_enabled")
    renewalReminders: bool = Field(validation_alias="renewal_reminders")
    obligationAlerts: bool = Field(validation_alias="obligation_alerts")
    complianceAlerts: bool = Field(validation_alias="compliance_alerts")
    approvalAlerts: bool = Field(validation_alias="approval_alerts")


class NotificationPreferencesUpdate(BaseModel):
    emailEnabled: bool | None = None
    smsEnabled: bool | None = None
    inAppEnabled: bool | None = None
    renewalReminders: bool | None = None
    obligationAlerts: bool | None = None
    complianceAlerts: bool | None = None
    approvalAlerts: bool | None = None


class OrganizationSettingsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    timezone: str
    defaultCurrency: str = Field(validation_alias="default_currency")


class OrganizationSettingsUpdate(BaseModel):
    name: str | None = None
    timezone: str | None = None
    defaultCurrency: str | None = None
