from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi.responses import FileResponse

from reportlab.pdfgen import canvas

import pandas as pd

from app.config.database import get_db

from app.schemas.report import (
    ReportCreate,
    ReportResponse
)

from app.services import report_service

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


# GET ALL REPORTS

@router.get(
    "/",
    response_model=List[ReportResponse]
)
def get_all_reports(
    db: Session = Depends(get_db)
):

    return report_service.get_all_reports(db)


# GET REPORT BY ID

@router.get(
    "/{report_id}",
    response_model=ReportResponse
)
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = report_service.get_report_by_id(
        db,
        report_id
    )

    if report is None:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report


# CREATE REPORT

@router.post(
    "/",
    response_model=ReportResponse,
    status_code=201
)
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db)
):

    return report_service.create_report(
        db,
        report
    )


# UPDATE REPORT

@router.put(
    "/{report_id}",
    response_model=ReportResponse
)
def update_report(
    report_id: int,
    report: ReportCreate,
    db: Session = Depends(get_db)
):

    updated = report_service.update_report(
        db,
        report_id,
        report
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return updated


# DELETE REPORT

@router.delete("/{report_id}")
def delete_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    deleted = report_service.delete_report(
        db,
        report_id
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return deleted


# PREVIEW


@router.get("/{report_id}")

def preview_report(
    report_id:int,
    db:Session=Depends(get_db)
):

    report=report_service.get_report_by_id(
        db,
        report_id
    )


    if not report:

        raise HTTPException(
            404,
            "Report not found"
        )


    return report





# PDF DOWNLOAD


@router.get("/{report_id}/pdf")

def download_pdf(
    report_id:int,
    db:Session=Depends(get_db)
):


    report=report_service.get_report_by_id(
        db,
        report_id
    )


    path=f"report_{report_id}.pdf"



    pdf=canvas.Canvas(path)


    pdf.drawString(
        100,
        750,
        report.title
    )


    pdf.drawString(
        100,
        700,
        report.department
    )


    pdf.drawString(
        100,
        650,
        report.status
    )


    pdf.save()



    return FileResponse(
        path,
        filename=path
    )





# EXCEL DOWNLOAD


@router.get("/{report_id}/excel")

def download_excel(
    report_id:int,
    db:Session=Depends(get_db)
):


    report=report_service.get_report_by_id(
        db,
        report_id
    )



    data={

        "Title":[report.title],

        "Department":[report.department],

        "Status":[report.status],

        "File Size":[report.file_size],

        "Generated Date":[
            report.generated_date
        ]

    }



    df=pd.DataFrame(data)


    file="report.xlsx"


    df.to_excel(
        file,
        index=False
    )


    return FileResponse(
        file,
        filename=file
    )
