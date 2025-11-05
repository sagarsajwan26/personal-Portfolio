import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendMail = async (firstName, lastName, email, subject, message) => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
    </head>
    <body style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
    ">
        <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        ">
            <h1 style="
                color: white;
                margin: 0;
                font-size: 28px;
                font-weight: 300;
                letter-spacing: 1px;
            ">📧 New Contact Form Submission</h1>
        </div>
        
        <div style="
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        ">
            <!-- Contact Information -->
            <div style="
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 25px;
                border-left: 4px solid #667eea;
            ">
                <h2 style="
                    color: #667eea;
                    margin: 0 0 15px 0;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                ">
                    👤 Contact Information
                </h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="
                            padding: 8px 12px;
                            font-weight: 600;
                            color: #555;
                            width: 100px;
                            vertical-align: top;
                        ">Name:</td>
                        <td style="
                            padding: 8px 12px;
                            color: #333;
                            font-size: 16px;
                        ">${firstName} ${lastName || ""}</td>
                    </tr>
                    <tr style="background-color: #f8f9fa;">
                        <td style="
                            padding: 8px 12px;
                            font-weight: 600;
                            color: #555;
                            vertical-align: top;
                        ">Email:</td>
                        <td style="
                            padding: 8px 12px;
                            color: #333;
                            font-size: 16px;
                        ">
                            <a href="mailto:${email}" style="
                                color: #667eea;
                                text-decoration: none;
                                border-bottom: 1px solid #667eea;
                            ">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="
                            padding: 8px 12px;
                            font-weight: 600;
                            color: #555;
                            vertical-align: top;
                        ">Subject:</td>
                        <td style="
                            padding: 8px 12px;
                            color: #333;
                            font-size: 16px;
                            font-weight: 500;
                        ">${subject}</td>
                    </tr>
                </table>
            </div>

            <!-- Message Content -->
            <div style="
                background: #fff;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 25px;
            ">
                <h3 style="
                    color: #667eea;
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                ">
                    💬 Message
                </h3>
                <div style="
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 6px;
                    border-left: 3px solid #28a745;
                    font-size: 15px;
                    line-height: 1.6;
                    color: #333;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                ">${message}</div>
            </div>

            <!-- Footer -->
            <div style="
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #e9ecef;
            ">
                <p style="
                    margin: 0;
                    color: #666;
                    font-size: 13px;
                ">
                    📅 Received on ${new Date().toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    })}
                </p>
                <p style="
                    margin: 10px 0 0 0;
                    color: #999;
                    font-size: 12px;
                ">
                    This email was sent from your website contact form.
                </p>
            </div>
        </div>

        <!-- Reply Button -->
        <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${email}?subject=Re: ${subject}" style="
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: 600;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
            ">
                ↩️ Reply to ${firstName}
            </a>
        </div>
    </body>
    </html>
    `;

    return await transport.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.MY_EMAIL,
        subject: `📧 New Contact: ${subject}`,
        html: htmlTemplate, // Use html instead of text
        text: `
Contact Form Submission:

From: ${firstName} ${lastName || ""}
Email: ${email}
Subject: ${subject}

Message:
${message}

Received: ${new Date().toLocaleString()}
        ` // Fallback plain text version
    });
}
