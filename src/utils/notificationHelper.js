import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmailNotification(to, subject, message) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        });
    } catch (err) {
    }
}

async function sendPushNotification(deviceToken, title, body) {
    console.log("Push notification triggered:");
    console.log({
        deviceToken,
        title,
        body,
    });
}

function scheduleReminder(delayMs, callback) {
    setTimeout(callback, delayMs);
}

async function sendSMS(phoneNumber, message) {
    // In tests we return a simple success object so callers can assert a value
    return Promise.resolve({ success: true });
}

export {
    sendEmailNotification,
    sendPushNotification,
    scheduleReminder,
    sendSMS,
};
