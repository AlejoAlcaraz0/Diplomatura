import '../styles/components/pages/NosotrosPage.css';

const NosotrosPage = (props) => {
  return (
    <main className="holder">
      <div className="historia">
        <h2>Historia</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestiae magnam, rerum voluptatem illum ipsa dolorem commodi ratione sequi repellat nam quibusdam suscipit impedit veniam cum dolorum aut, natus dolor!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam excepturi, tempore ipsum nesciunt architecto modi provident natus minus nam commodi corporis est dolores consequatur odio repellat quidem velit voluptatem non.</p>
      </div>
      <div className="staff">
        <h2>Staff</h2>
        <div className="personas">
          <div className="persona">
            <img src="images/nosotros/nosotros1.jpg" alt="Juan Gomez" />
            <h5>Juan Gomez</h5>
            <h6>Gerente General</h6>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum doloribus sunt et illum totam voluptatum voluptate quas sed sequi ab dolorem voluptatem culpa reprehenderit, placeat rerum necessitatibus officia hic minus.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NosotrosPage;