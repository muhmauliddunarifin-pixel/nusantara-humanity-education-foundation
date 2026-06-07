import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Path to local sheet config database (on serverless, is ephemeral, env vars are preferred)
const CONFIG_PATH = path.join(process.cwd(), "sheets-config.json");

// Helper to decode Firebase JWT and check Admin Email
function verifyAdmin(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.substring(7);
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
    const email = payload.email || "";
    return email === "maulidcreative@gmail.com" || email === "nhefoundation26@gmail.com";
  } catch (e) {
    return false;
  }
}

const app = express();

// Middleware to parse JSON
app.use(express.json());

// API Route: Send Contact email directly to NHE Gmail
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Kolom nama, email, subjek, dan pesan wajib diisi" });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailRecipient = "nhefoundation26@gmail.com";

  // Professional lazy check for SMTP variables in environment configuration
  if (!smtpUser || !smtpPass) {
    console.warn("SMTP_USER atau SMTP_PASS belum dikonfigurasi pada Settings. Pesan tersimpan di database dan simulasi email berhasil dijalankan.");
    return res.json({
      success: true,
      mocked: true,
      message: "Pesan Anda berhasil diterima sekretariat! (Simulasi Email Aktif: Harap konfigurasikan SMTP_USER & SMTP_PASS di panel rahasia)."
    });
  }

  try {
    // Lazy initialize transporter to prevent cold-start crashes in sandboxed cloud environments
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #fafafa; color: #222;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #D4AF37; font-family: 'Playfair Display', serif, sans-serif; margin: 0; font-size: 24px; tracking-wide: true;">NHE Foundation</h2>
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-top: 4px; margin-bottom: 0;">Kontak Hubungan Kemitraan</p>
        </div>
        
        <p style="font-size: 14px; line-height: 1.5; color: #444;">Formulir Hubungi Kami website NHE mendeteksi koordinat pesan baru:</p>
        
        <div style="background-color: #ffffff; padding: 18px; border-radius: 8px; border: 1px solid #ededed; margin-top: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #555; border-bottom: 1px solid #f6f6f6;">Nama Pengirim:</td>
              <td style="padding: 8px 0; color: #111; border-bottom: 1px solid #f6f6f6;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; border-bottom: 1px solid #f6f6f6;">Surel Pengirim:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f6f6f6;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; border-bottom: 1px solid #f6f6f6;">Subjek Hubungan:</td>
              <td style="padding: 8px 0; color: #111; border-bottom: 1px solid #f6f6f6;">${subject}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #D4AF37; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <p style="font-weight: bold; margin-top: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #D4AF37;">Rincian Gagasan / Maksud:</p>
          <p style="white-space: pre-wrap; color: #333; line-height: 1.7; margin-bottom: 0; font-size: 14px;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 11px; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 20px; line-height: 1.4;">
          Nusantara Humanity & Education (NHE) Foundation<br />
          <strong style="color: #444;">Naungan Forum Genre Kabupaten Muna</strong><br />
          Muna, Sulawesi Tenggara, Indonesia.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${smtpUser}>`,
      to: emailRecipient,
      replyTo: email,
      subject: `[NHE Web Kontak] ${subject}`,
      html: htmlContent,
    });

    return res.json({
      success: true,
      message: "Pesan Anda berhasil terkirim langsung ke Gmail NHE Foundation."
    });
  } catch (error) {
    console.error("Kesalahan Nodemailer/SMTP: ", error);
    return res.status(500).json({
      error: "Gagal mendisposisikan email ke Gmail. Namun, pesan Anda tetap tersimpan utuh di Firestore database.",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// GET admin sheets config
app.get("/api/sheets/config", (req, res) => {
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: "Akses ditolak. Khusus Administrator NHE." });
  }

  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf-8");
      return res.json(JSON.parse(data));
    }
  } catch (e) {
    console.error("Gagal membaca sheets-config.json:", e);
  }

  return res.json({ enabled: false, webhookUrl: "" });
});

// POST save admin sheets config
app.post("/api/sheets/config", (req, res) => {
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: "Akses ditolak. Khusus Administrator NHE." });
  }

  const { enabled, webhookUrl } = req.body;

  try {
    const config = { enabled: !!enabled, webhookUrl: webhookUrl || "" };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
    return res.json({ success: true, config });
  } catch (e) {
    console.error("Gagal menulis sheets-config.json:", e);
    return res.status(500).json({ error: "Gagal menyimpan konfigurasi ke server." });
  }
});

// POST sync volunteer registration to Google Sheets webhook
app.post("/api/sheets/sync", async (req, res) => {
  const { fullName, email, whatsapp, city, skill, motivation } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: "Nama lengkap wajib diisi" });
  }

  try {
    // Prioritize environment variable SHEETS_WEBHOOK_URL for direct writing
    let webhookUrl = process.env.SHEETS_WEBHOOK_URL || "";

    // Fallback to local config file if env variable isn't set
    if (!webhookUrl && fs.existsSync(CONFIG_PATH)) {
      try {
        const configData = fs.readFileSync(CONFIG_PATH, "utf-8");
        const config = JSON.parse(configData);
        webhookUrl = config.webhookUrl || "";
      } catch (e) {
        console.error("Gagal membaca sheets-config.json: ", e);
      }
    }

    if (!webhookUrl) {
      return res.status(503).json({ 
        error: "Sistem basis data pendaftaran (Google Sheets) belum dikonfigurasi. Hubungi tim Sekretariat NHE untuk mengisi nilai SHEETS_WEBHOOK_URL di .env atau dashboard, demi mencatat pendaftaran dari halaman relawan." 
      });
    }

    const payload = {
      createdAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" }),
      fullName,
      email: email || "-",
      whatsapp: whatsapp || "-",
      city: city || "-",
      skill: skill || "-",
      motivation: motivation || "-"
    };

    let response;
    try {
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (fetchErr: any) {
      console.error("Gagal melakukan fetch ke Google Sheets:", fetchErr);
      return res.status(502).json({
        error: `Gagal mengirim data. Webhook tidak dapat dihubungi atau URL salah. Detail: ${fetchErr.message || fetchErr}`
      });
    }

    const contentType = response.headers.get("content-type") || "";
    const isHtml = contentType.includes("text/html");
    const resText = await response.text();

    // Detect if we received a Google Login / "Unable to open" error page
    if (isHtml || resText.includes("<!DOCTYPE") || resText.includes("google-logo") || resText.includes("drive-logo") || resText.includes("unable to open") || resText.includes("Page not found")) {
      console.error("Google Webhook returned login/access-denied HTML web page:", resText.slice(0, 500));
      return res.status(401).json({
        error: "Webhook Google Sheets Anda belum disebarkan sebagai publik! Di Google Apps Script, klik 'Deploy' -> 'New Deployment', pilih jenis 'Web App', ganti 'Who has access' (Siapa yang memiliki akses) menjadi 'Anyone' (Siapa saja / Semua orang), lalu ganti URL Webhook dengan yang baru."
      });
    }

    if (!response.ok) {
      console.error("Google Apps Script Webhook returned HTTP error state:", response.status, resText);
      return res.status(502).json({
        error: `Google Sheets Webhook mengembalikan status Galat HTTP ${response.status}.`
      });
    }

    return res.json({ success: true, synced: true });
  } catch (e) {
    console.error("Gagal sinkron data ke Google Sheets Webhook:", e);
    return res.status(500).json({ error: "Gagal memproses sinkronisasi langsung ke Google Sheets. Mohon uji Webhook Anda." });
  }
});

// Root API route handler for Vercel Serverless health checks
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "Endpoint API tidak ditemukan." });
});

export default app;
