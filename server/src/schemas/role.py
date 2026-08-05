from pydantic import BaseModel


class RoleBase(BaseModel):

    role_name: str

    role_description: str


class RoleCreate(RoleBase):

    pass


class RoleUpdate(RoleBase):

    pass


class RoleResponse(RoleBase):

    role_id: int

    class Config:

        from_attributes = True
