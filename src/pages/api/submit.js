import { google } from "googleapis";

const SheetForm = {
  fecha: "",
  avion: "",
  piloto: "",
  taquimetro: 0,
  pago: 0,
  pagoPiloto: 0,
  saldo: 0,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only Post" });
  }

  const body = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:G1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.fecha,
            body.avion,
            body.piloto,
            body.taquimetro,
            body.pago,
            body.pagoPiloto,
            body.saldo,
          ],
        ],
      },
    });

    return res.status(200).json({ data: response.data });
  } catch (e) {
    return res.status(500).json({ message: e.message ?? "Something wrong" });
  }
}
