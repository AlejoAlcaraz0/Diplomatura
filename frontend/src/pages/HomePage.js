import '../styles/components/pages/HomePage.css';

const HomePage = (props) => {
  return (
    <main>
      <div className="holder">
        <img src="images/home/img01.jpg" alt="avion" />
      </div>
      <div className="columnas">
        <div className="bienvenidos left">
          <h2>Bienvenidos</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore consequuntur, unde eius harum cupiditate dolorem ipsam pariatur amet soluta exercitationem officia minus quibusdam iusto animi, quaerat, nulla rem corrupti dolorum.</p>
        </div>
        <div className="testimonios right">
          <h2>Testimonios</h2>
          <div className="testimonio">
            <span className="cita">Simplemente excelente. </span>
            <span className="autor">Juan Perez</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage;