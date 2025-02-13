import React from "react";
import "../styles/nosotros.css";

const ronaldGladiz = "/assets/images/about-1.png";
const about = "/assets/images/about.jpg";
const aboutHero = "/assets/images/about-hero.svg";




const Nosotros = () => {
  return (
    <div>
      {/* About Start */}
      <div className="contendedor-fluid py-5">
        <div className="contenedor">
          <div className="row">
            <div className="col-lg-6" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src={ronaldGladiz}
                  style={{ objectFit: "cover" }}
                  alt="About"
                />

              </div>
            </div>
            <div className="col-lg-6 pt-5 pb-lg-5 text-center">
              <div className="about-text bg-white p-4 p-lg-5 my-lg-5">
               {/* <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
                  About Us
                </h6>*/}
                <h1 className="mb-3 size-about-tittle ">🌿 Nuestra Historia!</h1>
                <p className="about-p">
                En 2016, Ronald Flores y Gladiz Popolizio convirtieron su pasión por el arte floral en Flores Popolizio, 
                una marca innovadora con el propósito de transformar el mercado peruano. Gracias a la creatividad de Ronald 
                en el diseño y la visión estratégica de Gladiz, lograron construir una marca sólida y diferenciada. Hoy, Flores 
                Popolizio es sinónimo de elegancia, calidad y detalle, ofreciendo arreglos exclusivos con los mejores insumos y 
                una presentación impecable. Más que flores, creamos experiencias memorables, donde cada composición cuenta una 
                historia y transmite emociones únicas. Nuestra esencia: innovación y calidez en cada diseño.

                </p>
                <p>🌸 Déjanos ser parte de tus momentos especiales. 🌸</p>    
                <button href="#" className="mt-8 px-8 py-3 bg-custom-btn text-white rounded-lg text-lg hover:bg-yellow-700">
                📅 Reserva Ahora
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}


        {/* Feature Start */}
        <div className="contenedor-fluid pb-5">
          <div className="contenedor">
          <div className="row about-p">
              <div className="col-md-4">
              <div className="d-flex mb-4 mb-lg-0">
              <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-custom-btn mr-3" style={{ height: "100px", width: "100px" }}>
                  <i className="fa fa-2x fa-bullseye text-white"></i>
              </div>
              <div className="d-flex flex-column">
                  <h5 className="h5-text">MISIÓN</h5>
                  <p className="m-0">Expresar sentimientos a través de flores y plantas de alta calidad, con diseños creativos, atención personalizada y un servicio de entrega confiable.</p>
              </div>
              </div>
              </div>
              <div className="col-md-4">
              <div className="d-flex mb-4 mb-lg-0">
              <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-custom-btn mr-3" style={{ height: "100px", width: "100px" }}>
                  <i className="fa fa-2x fa-award text-white"></i>
              </div>
              <div className="d-flex flex-column">
                  <h5 className="h5-text">VISIÓN</h5>
                  <p className="m-0">Ser la florería más innovadora y completa del Perú, expandiendo nuestra propuesta mediante franquicias y creando recuerdos inolvidables con arte floral.</p>
              </div>
              </div>
              </div>
              <div className="col-md-4">
              <div className="d-flex mb-4 mb-lg-0">
              <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-custom-btn mr-3" style={{ height: "100px", width: "100px" }}>
                  <i className="fa fa-2x fa-globe text-white"></i>
              </div>
              <div className="d-flex flex-column">
                  <h5 className="h5-text">FILOSOFÍA</h5>
                  <p className="m-0">Creemos en la innovación, creatividad y excelencia. Nos inspira la emoción de nuestros clientes y nos comprometemos a ofrecer belleza y calidez en cada creación.</p>
              </div>
              </div>
              </div>
          </div>
          </div>
          </div>
        {/* Feature End */}

      {/* Registration Start */}
      <div className="contenedor-fluid bg-registration py-5" style={{ margin: "0 0" }}>
        <div className="contenedor py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="mb-4">
                <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>Mega Ofertas</h6>
                <h1 className="text-white size-about-tittle"><span className="text-primary">30% DE </span>Descuento FP</h1>
              </div>
              <p className="text-white">Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor lorem ipsum ut sed eos,
                ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                dolor</p>
              <ul className="list-inline text-white m-0">
                <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Labore eos amet dolor amet diam</li>
                <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Etsea et sit dolor amet ipsum</li>
                <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Diam dolor diam elitripsum vero.</li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-custom-btn text-center p-4">
                  <h1 className="text-white m-0 size-about-tittle ">CONTÁCTANOS</h1>
                </div>
                <div className="card-body rounded-bottom bg-white p-5">
                  <form>
                    <div className="form-group">
                      <input type="text" className="form-control p-4" placeholder="Nombres y Apellidos" required />
                    </div>
                    <div className="form-group">
                        <input type="tel" className="form-control p-4" placeholder="Teléfono / Whatsapp" required />
                      </div>
                    <div className="form-group">
                      <input type="email" className="form-control p-4" placeholder="Correo Electrónico" required />
                    </div>
                    <div className="form-group">
                        <textarea
                          className="form-control p-4"
                          rows="5" // Aumenta el número de filas
                          style={{ minHeight: "200px" }} // Asegura un mínimo de altura
                          id="message"
                          placeholder="Mensaje"
                          required
                          data-validation-required-message="Please enter your message"
                        ></textarea>
                        <p className="help-block text-danger"></p>
                      </div>
                    <div className="text-center">
                      <button className="mt-8 px-8 py-3 bg-custom-btn text-white rounded-lg text-lg hover:bg-yellow-700" type="submit">Enviar Mensaje</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Registration End */}
    </div>
  );
};

export default Nosotros;