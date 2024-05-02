import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const img = "../photos/Calça-Doces_Sonhos-menina-5ano-9ano-azul-45.webp";

const AllProducts = () => {
    const [allData, setAllData] = useState([]);
    const [corTrue, setCorTrue] = useState(false);
    const [marcaTrue, setMarcaTrue] = useState(false);
    const [count, setCount] = useState(1);
    const [typesMarcas, setTypesMarcas] = useState([]);
    const [typesCores, setTypesCores] = useState([]);
    const [typeBody, setTypeBody] = useState("");
  
    const handleClick = () => {
      if (document.querySelector(".cores ul").style.display === "none") {
        document.querySelector(".cores ul").style.display = "flex";
        document.querySelector(".cores-name i").className =
          "fa-solid fa-caret-up";
      } else {
        document.querySelector(".cores ul").style.display = "none";
        document.querySelector(".cores-name i").className =
          "fa-solid fa-caret-down";
      }
    };
    const handleClick2 = () => {
      if (document.querySelector(".marcas ul").style.display === "none") {
        document.querySelector(".marcas ul").style.display = "flex";
        document.querySelector(".marcas-name i").className =
          "fa-solid fa-caret-up";
      } else {
        document.querySelector(".marcas ul").style.display = "none";
        document.querySelector(".marcas-name i").className =
          "fa-solid fa-caret-down";
      }
    };
    const clickChange = (e, name) => {
      const quadrado = e.target.previousSibling;
      if (quadrado.style.backgroundColor === "black") {
        quadrado.style.backgroundColor = "white";
        setTypesMarcas((marcas) => {
          return marcas.filter((marca) => marca !== name);
        });
      } else {
        quadrado.style.backgroundColor = "black";
        setTypesMarcas((marcas) => {
          return [...marcas, name];
        });
      }
    };
    const clickChangeCor = (e, cor) => {
      if (e.target.classList.contains("texto-riscado")) {
        e.target.style.textDecoration = "none";
        e.target.classList.remove("texto-riscado");
        e.target.classList.add("texto-normal");
        setTypesCores((c) => {
          return c.filter((cores) => cores !== cor);
        });
      } else {
        e.target.style.textDecoration = "line-through";
        e.target.classList.add("texto-riscado");
        e.target.classList.remove("texto-normal");
        return setTypesCores((cores) => [...cores, cor]);
      }
    };
    const clickAddBody = (name) => {
      setTypeBody(name);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const marcasString = typesMarcas.join(",");
          const coresString = typesCores.join(",");
          const response = await axios.get(
            `http://localhost:3300/api/user/products`,
            {
              params: { marca: marcasString, cor: coresString, body: typeBody },
            }
          );
          if (response && response.data) {
            const data = response.data;
            setAllData(data);
          } else {
            console.error("Resposta inválida:", response);
          }
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      };
      fetchData();
    }, [typesMarcas, typesCores, typeBody]);
  
    return (
      <>
        <div className="body">
          <div className="filterProducts">
            <h2>Produtos</h2>
  
            <div className="topic-types">
              <ul>
                <li
                  onClick={() => clickAddBody("menina")}
                  style={{ marginTop: "20px" }}
                >
                  Para Garotas
                </li>
                <li onClick={() => clickAddBody("menino")}>Para Garotos</li>
                <li
                  onClick={() => clickAddBody("maes")}
                  style={{ marginBottom: "20px" }}
                >
                  Para Mães
                </li>
              </ul>
            </div>
            <div className="cores">
              <div className="cores-name" onClick={handleClick}>
                <h3>CORES</h3>
                <i className="fa-solid fa-caret-up"></i>
              </div>
              <ul style={{ display: "none" }}>
                <li>
                  <div
                    style={{ backgroundColor: "beige" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "bege")}>Bege</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "#ededed" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "branco")}>Branco</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "red" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "vermelho")}>
                    Vermelho
                  </span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "black" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "preto")}>Preto</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "purple" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "roxo")}>Roxo</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "brown" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "cinza")}>Marrom</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "blue" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "azul")}>Azul</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "orange" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "laranja")}>
                    Laranja
                  </span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "pink" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "rosa")}>Rosa</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "gray" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "cinza")}>Cinza</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "green" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "verde")}>Verde</span>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "yellow" }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "amarelo")}>
                    Amarelo
                  </span>
                </li>
                <li style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      background:
                        "linear-gradient(45deg, red 0%, red 25%, green 25%, green 50%, blue 50%, blue 75%, yellow 75%, yellow 100%)",
                    }}
                    className="bolinha"
                  ></div>{" "}
                  <span onClick={(e) => clickChangeCor(e, "colorido")}>
                    Colorido
                  </span>
                </li>
              </ul>
            </div>
            <div className="marcas">
              <div className="marcas-name" onClick={handleClick2}>
                <h3>MARCAS</h3>
                <i className="fa-solid fa-caret-up"></i>
              </div>
              <ul style={{ display: "none" }}>
                <li>
                  <div className="quadrado"></div>
                  <span onClick={(e) => clickChange(e, "BrincaKids")}>
                    BrincaKids
                  </span>
                </li>
                <li>
                  <div className="quadrado"></div>
                  <span onClick={(e) => clickChange(e, "Vital Vibes")}>
                    Vital Vibes
                  </span>
                </li>
                <li>
                  <div className="quadrado"></div>
                  <span onClick={(e) => clickChange(e, "Doces Sonhos")}>
                    Doces Sonhos
                  </span>
                </li>
                <li style={{ marginBottom: "20px" }}>
                  <div className="quadrado"></div>
                  <span onClick={(e) => clickChange(e, "Risos e Cia")}>
                    Risos e Cia
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-of-products">
            {allData.map((product, i) => {
              const {
                fileName,
                marca,
                name,
                price,
                longProduct,
                lightProduct,
                promotion,
              } = product;
              const newFileName = fileName
                .replace(/\\/g, "/")
                .replace(/^"(.*)"$/, "$1");
              const backgroundImageStyle = {
                backgroundImage: `url(../src/${newFileName})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              };
  
              return (
                <div key={i} className="box-of-products">
                  <div className="top-of-img-products">
                    <p
                      style={{ display: promotion === 1 ? "flex" : "none" }}
                      id="discount"
                    >
                      {promotion === 1 ? "Desconto" : null}
                    </p>
                    <p id="new">Novo</p>
                    <div
                      className="img-products"
                      style={backgroundImageStyle}
                    ></div>
                  </div>
                  <div className="about-imgs">
                    <hr></hr>
                    <p id="marca">{marca}</p>
                    <span id="name">
                      {longProduct === 0 ? name : null}
                      {longProduct === 1 && name === "Blusa"
                        ? name + " comprida"
                        : null}
                      {longProduct === 1 && name === "Vestido"
                        ? name + " comprido"
                        : null}
                    </span>
                    <span
                      style={{
                        display: promotion === 0 ? "none" : "flex",
                      }}
                      id="old-price"
                    >
                      {`R$ ${promotion === 0 ? null : price}`}
                    </span>
                    <span id="price">
                      {`R$ ${
                        promotion === 0 ? price : price - price * 0.15 + "0"
                      }`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
};

export default AllProducts;
