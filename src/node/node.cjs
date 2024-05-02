const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Cvsm2304",
  database: "projeto",
});

conexao.connect(function (erro) {
  if (erro) throw erro;
  console.log("Conexão feita!");
});

const folderImage = path.join(__dirname, "../photos");

const app = express();

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../App.jsx"));
});

app.use(cors());

const getImageData = () => {
  let allImagesProp2 = [];

  const getImage = (filename) => {
    const imageExtensions = [".webp", ".jpg", ".jpeg"];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  };

  const getAllImages = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
      if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
        arrayOfFiles = getAllImages(path.join(dirPath, file), arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    });

    return arrayOfFiles;
  };

  function filterImages(files) {
    return files.filter((file) => getImage(file));
  }

  const allImages = getAllImages(folderImage);
  const imageFiles = filterImages(allImages);

  imageFiles.forEach((file) => {
    const regex = /\\photos\\([^\\-]+)/;
    const novaFrase = regex.exec(file);
    const nameProd = novaFrase[1];

    let typeProd;

    const typeProdMatch = file.match(
      /\b(bermuda|short|blusa|camiseta|suéter|acessorios|calça|calçado|pijama|saia|jaqueta|vestido)\b/gi
    );
    if (typeProdMatch !== null) {
      typeProd = typeProdMatch.map((match) => match.toLowerCase());
    } else {
      console.log("Nenhum tipo de produto encontrado na string.");
    }
    const longTypeProd = file.includes("comprida");
    const colorProd = file.match(
      /\b(colorido|colorida|azul|vermelho|verde|amarelo|roxo|laranja|rosa|preto|branco|marrom)\b/gi
    );
    let marcaProd = file.match(
      /\b(Doces_Sonhos|Risos_e_Cia|BrincaKids|Vital_Vibes)\b/g
    );
    if (marcaProd) {
      marcaProd.forEach((match, index) => {
        marcaProd[index] = match.replace(/_/g, " ");
      });
    }

    const priceProd = file.match(/\b\d{2,}\b/g);
    const yearProd = file.match(/\b(1ano|5ano|9ano)\b/g);
    const typeBodyProd = file.match(/\b(menino|menina|mae|maes)\b/);
    const lightProd = file.includes("claro");

    const fullPath = file;
    const startIndex = fullPath.indexOf("photos");
    const relativePath = fullPath.substring(startIndex);
    const relativePathJson = JSON.stringify(relativePath);

    const promotion = file.includes("promoção");
    const newPromo = promotion === false ? 0 : 1;

    const user = {
      id: uuidv4(),
      name: nameProd,
      type: typeProd,
      longProduct: longTypeProd ? 1 : 0,
      lightProduct: lightProd ? 1 : 0,
      color: colorProd ? colorProd[0] : null,
      marca: marcaProd ? marcaProd[0] : null,
      price: priceProd !== null ? priceProd : 0,
      promotion: newPromo,
      yearProd: yearProd ? yearProd[0] : null, // Assuming you want only the first match
      typeBody: typeBodyProd ? typeBodyProd[0] : null,
      fileName: relativePathJson,
    };
    allImagesProp2.push(user);
  });

  return allImagesProp2;
};

app.get("/api/user", (req, res) => {
  const allImagesJson = getImageData();
  res.json(allImagesJson);
});

app.get("/api/user/products", (req, res) => {
  const { marca, cor, body } = req.query;

  if ((marca && marca.trim() !== "") || (cor && cor.trim() !== "")) {
    if (body && body.trim() !== "") {
      let queryString = "SELECT * FROM products WHERE ";
      const params = [];
      const placeHolderBody = body
        .split(",")
        .map(() => "?")
        .join(",");
      queryString += `typeBody IN (${placeHolderBody})`;
      params.push(...body.split(","));

      if (cor && cor.trim() !== "") {
        const placeHolderCor = cor
          .split(",")
          .map(() => "?")
          .join(",");
        queryString += ` AND color IN (${placeHolderCor})`;
        params.push(...cor.split(","));
      }

      if (marca && marca.trim() !== "")  {
        const placeHolderMarca = marca
          .split(",")
          .map(() => "?")
          .join(",");
        queryString += ` AND marca IN (${placeHolderMarca})`;
        params.push(...marca.split(","));
      }

      conexao.query(queryString, params, (error, results, fields) => {
        if (error) {
          console.error("Erro ao executar consulta:", error);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        res.json(results);
      });
    } else {
      let queryString = "SELECT * FROM products WHERE ";
      const params = [];

      if (marca && marca.trim() !== "") {
        const placeHolderMarca = marca
          .split(",")
          .map(() => "?")
          .join(",");
        queryString += `marca IN (${placeHolderMarca})`;
        params.push(...marca.split(","));
      }

      if (cor && cor.trim() !== "") {
        if (marca && marca.trim() !== "") queryString += " AND ";
        const placeHolderCor = cor
          .split(",")
          .map(() => "?")
          .join(",");
        queryString += `color IN (${placeHolderCor})`;
        params.push(...cor.split(","));
      }

      conexao.query(queryString, params, (error, results, fields) => {
        if (error) {
          console.error("Erro ao executar consulta:", error);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        res.json(results);
      });
    }
  } else if (body && body.trim() !== "") {
    let queryString = "SELECT * FROM products WHERE ";
    const params = [];
    const placeHolderBody = body
      .split(",")
      .map(() => "?")
      .join(",");
    queryString += `typeBody IN (${placeHolderBody})`;
    params.push(...body.split(","));

    conexao.query(queryString, params, (error, results, fields) => {
      if (error) {
        console.error("Erro ao executar consulta:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      res.json(results);
    });
  } else {
    conexao.query("SELECT * FROM products", (error, results, fields) => {
      if (error) {
        console.error("Erro ao executar consulta:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      res.json(results);
    });
  }
});

app.get("/api/insert", (req, res) => {
  const allImagesProp2 = getImageData();

  allImagesProp2.forEach((user) => {
    let sql = `INSERT INTO products (id, name, type, longProduct, lightProduct, color, marca, price, yearBody, typeBody, fileName, promotion) VALUES ('${user.id}', '${user.name}', '${user.type}', '${user.longProduct}', '${user.lightProduct}', '${user.color}', '${user.marca}', '${user.price}', '${user.yearProd}', '${user.typeBody}', '${user.fileName}', '${user.promotion}')`;

    conexao.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 registro inserido");
    });
  });

  res.send("Registros inseridos com sucesso");
});

app.listen(3300, () => {
  console.log("Servidor em execução na porta 3300...");
});
