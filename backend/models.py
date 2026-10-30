from pydantic import BaseModel


class DisasterRequest(BaseModel):
    disaster_type: str
    location: str
    severity: str
    population: int



from pydantic import BaseModel
from typing import Optional


class DisasterRequest(BaseModel):
    disaster_type: str
    location: str
    severity: str
    population: int


class DisasterReport(BaseModel):
    disaster_type: str
    location: str
    severity: str
    description: str
    reporter_name: Optional[str] = None
    contact: Optional[str] = None