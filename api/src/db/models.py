from dataclasses import dataclass
from app import db
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import Integer, String

@dataclass
class Note(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    content: Mapped[str] = mapped_column(String, nullable=False)
