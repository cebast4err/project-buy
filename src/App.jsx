import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/user/products`,
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
  }, []);

  return (
    <>
      <div className="body">
        <header>
          <nav>
          <div className="title">
              <h1>clouser</h1>
            </div>
            <div className="top-types-title">
              <ul>
                <li>
                  <a href="">Marcas</a>
                </li>
                <li>
                  <a href="">Vamos ajuda-lo!</a>
                </li>
                <li>
                  <a href="">Contato</a>
                </li>
              </ul>
            </div>
            <div className="store-login">
              <i className="fa-solid fa-user"></i>
              <i className="fa-solid fa-store"></i>
            </div>
          </nav>
          <div className="classes-types">
            <ul>
              <li>
                <a href="">Novidades</a>
              </li>
              <li>
                <a href="">Meninas</a>
              </li>
              <li>
                <a href="">Meninos</a>
              </li>
              <li>
                <a href="">Mães</a>
              </li>
              <li>
                <a href="">Acessórios</a>
              </li>
              <li>
                <a href="">Desconto</a>
              </li>
            </ul>
          </div>
        </header>
        <main>
          <section className="sec-1">
            <div className="container-1">
              <div className="left-container-1">
                <p>Venha conhecer nossos produtos!</p>
                <button>
                  <a href="">Clique aqui</a>
                </button>
              </div>
              <div className="right-container-1">
                <img src="../src/photos/imgs-site/store-clothes.jpg" alt="" />
              </div>
            </div>
          </section>
          <section className="sec-2">
            <div className="container-2">
              <div className="title-container-2">
                <img src="" alt="" />
                <div>
                  <p></p>
                  <h2></h2>
                </div>
              </div>
              <div className="many-box-of-types">
                <div className="box-types">
                  <img src="" alt="" />
                  <div>
                    <span></span>
                    <div></div>
                  </div>
                </div>
                <div className="box-types">
                  <img src="" alt="" />
                  <div>
                    <span></span>
                    <div></div>
                  </div>
                </div>
                <div className="box-types">
                  <img src="" alt="" />
                  <div>
                    <span></span>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="sec-3">
            <div className="container-3">
              <div className="title-container-3">
                <p></p>
                <h2></h2>
              </div>
              <div className="many-brands">
                <ul>
                  <li>
                    <a href="">BrincaKids</a>
                  </li>
                  <li>
                    <a href="">Risos e Cia.</a>
                  </li>
                  <li>
                    <a href="">Doces Sonhos</a>
                  </li>
                  <li>
                    <a href="">VitalVibes</a>
                  </li>
                </ul>
              </div>
              <div className="many-box-of-products">
                <div className="box-product">
                  <div>
                    <img src="" alt="" />
                    <span>esta informação está dentro da imagem</span>
                  </div>
                  <h3></h3>
                  <span></span>
                  <p></p>
                </div>
              </div>
            </div>
          </section>
          <section className="sec-4">
            <div className="container-4">
              <img className="left-container-4" src="" alt="" />
              <div className="right-container-4">
                <p></p>
                <span></span>
                <button></button>
              </div>
            </div>
          </section>
          <section className="sec-5">
            <div className="container-5">
              <div className="describes-products">
                <i></i>
                <p></p>
              </div>
              <div className="box-imgs-products">
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
            </div>
          </section>
        </main>
        <footer>
          <div className="footer-info">
            <ul>
              <li>
                <a href="">Aqui vão ter algumas informações</a>
              </li>
              <li>
                <a href="">contato</a>
              </li>
              <li>
                <a href="">Lojas</a>
              </li>
            </ul>
          </div>
          <div className="footer-nav">
            <ul>
              <li>
                <a href="">Aqui vão ter algumas categorias</a>
              </li>
              <li>
                <a href="">novidades</a>
              </li>
              <li>
                <a href="">desconto</a>
              </li>
            </ul>
          </div>
          <div className="footer-img">
            <img src="" alt="" />
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
