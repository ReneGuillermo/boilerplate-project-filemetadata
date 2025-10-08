var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Multer
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// End point de la API
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  // El archivo subido estará disponible en req.file después de que Multer lo procese
  const file = req.file;

  // Verificar si se subió un archivo
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Extraer los metadatos y devolver el JSON esperado
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size, // El tamaño está en bytes
  });
});

// Iniciar el servidor
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
