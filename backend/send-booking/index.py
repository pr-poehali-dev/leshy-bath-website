import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на бронирование бани на почту владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    room = body.get("room", "").strip()
    date = body.get("date", "").strip()
    time = body.get("time", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    to_email = "lechei90@mail.ru"
    from_email = "lechei90@mail.ru"
    smtp_password = os.environ["SMTP_PASSWORD"]

    subject = f"Новая заявка на бронирование — {room or 'не указано'}"
    html = f"""
    <h2>Новая заявка на бронирование</h2>
    <table style="border-collapse:collapse;font-size:15px;">
      <tr><td style="padding:6px 16px 6px 0;color:#888;">Имя:</td><td><b>{name}</b></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#888;">Телефон:</td><td><b>{phone}</b></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#888;">Помещение:</td><td><b>{room or '—'}</b></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#888;">Дата:</td><td><b>{date or '—'}</b></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#888;">Время:</td><td><b>{time or '—'}</b></td></tr>
    </table>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }