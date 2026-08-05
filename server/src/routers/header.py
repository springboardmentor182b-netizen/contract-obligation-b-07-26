from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

import importlib
import tempfile

router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]

)


@router.get("/export/pdf")

def export_dashboard():

    try:
        canvas_module = importlib.import_module("reportlab.pdfgen.canvas")
        canvas = canvas_module.Canvas
    except ModuleNotFoundError as exc:
        raise HTTPException(status_code=503, detail="PDF export requires the reportlab package.") from exc

    temp = tempfile.NamedTemporaryFile(

        delete=False,

        suffix=".pdf"

    )

    pdf = canvas.Canvas(temp.name)

    pdf.setFont("Helvetica-Bold",18)

    pdf.drawString(

        180,

        800,

        "Compliance Dashboard"

    )

    pdf.setFont(

        "Helvetica",

        12

    )

    pdf.drawString(

        50,

        760,

        "Compliance Monitoring Dashboard Report"

    )

    pdf.drawString(

        50,

        720,

        "Generated Successfully."

    )

    pdf.save()

    return FileResponse(

        temp.name,

        media_type="application/pdf",

        filename="ComplianceDashboard.pdf"

    )
