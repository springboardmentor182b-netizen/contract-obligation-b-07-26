from fastapi import APIRouter
from fastapi.responses import FileResponse

from reportlab.pdfgen import canvas

import tempfile

router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]

)


@router.get("/export/pdf")

def export_dashboard():

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
