from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from src.config import settings
from pathlib import Path

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_password_reset_email(email: str, reset_code: str, user_name: str = "User"):
    """
    Send password reset code to user's email
    """
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }}
            .content {{
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }}
            .header {{
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 2px solid #5a67d8;
            }}
            .logo {{
                font-size: 28px;
                font-weight: bold;
                color: #5a67d8;
            }}
            .reset-code {{
                text-align: center;
                margin: 30px 0;
                padding: 20px;
                background-color: #f7fafc;
                border-radius: 8px;
            }}
            .code {{
                font-size: 36px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #5a67d8;
                margin: 10px 0;
            }}
            .warning {{
                background-color: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 15px;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
                color: #718096;
                font-size: 14px;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="header">
                    <div class="logo">🔐 ContractIQ</div>
                    <p style="color: #718096; margin-top: 10px;">Password Reset Request</p>
                </div>
                
                <h2>Hello {user_name},</h2>
                
                <p>We received a request to reset your password for your ContractIQ account. Use the code below to reset your password:</p>
                
                <div class="reset-code">
                    <p style="margin: 0; font-size: 14px; color: #718096;">Your Reset Code</p>
                    <div class="code">{reset_code}</div>
                    <p style="margin: 0; font-size: 12px; color: #718096;">Valid for 15 minutes</p>
                </div>
                
                <p>Enter this code on the password reset page to create a new password.</p>
                
                <div class="warning">
                    <strong>⚠️ Security Notice:</strong>
                    <ul style="margin: 10px 0 0 0;">
                        <li>This code expires in 15 minutes</li>
                        <li>If you didn't request this, please ignore this email</li>
                        <li>Never share this code with anyone</li>
                    </ul>
                </div>
                
                <p>If you have any questions, contact our support team.</p>
                
                <div class="footer">
                    <p><strong>ContractIQ</strong> - Contract Obligation Management Platform</p>
                    <p>This is an automated email. Please do not reply to this message.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    """

    message = MessageSchema(
        subject="Password Reset Code - ContractIQ",
        recipients=[email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    
    return True
