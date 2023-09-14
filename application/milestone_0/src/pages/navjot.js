import Header from "../components/header";
import "../styles/Nav.scss";
import linkedin from "../images/linked-in.jpg";
import NavImg from "../images/Nav.jpg";

export default function Main() {
  return (
    <>
      <Header headerText="Navjot Singh" subheaderText="Git Master" />
      <div className="image-section">
        <div className="profile-image">
          <img src={NavImg} alt="Navjot's" className="nav-image" />
        </div>
      </div>

      <main>
        <div className="linkedin-logo-container">
          <a
            href="https://www.linkedin.com/in/navjot-singh-4a5a09266/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            <img src={linkedin} alt="LinkedIn" className="linkedin-logo" />
          </a>
        </div>

        <div className="section">
          <div>
            <h4>About myself:</h4>
            <p className="message">
            Hello, I'm Navjot Singh, and I'm pursuing my Bachelor's degree in Computer Science. 
            My love for computers began in high school during a computer class, and I've been passionate about it ever since.
             My main goal is to work for an electric car company where I can combine my passion for cars and computers, 
             contributing to the exciting world of electric vehicles and technology.
            </p>
          </div>
        </div>

        <div className="section">
          <div>
            <h4>Hobbies:</h4>
            <ul>
              <li>Working on cars</li>
              <li>Drawing</li>
              <li>Basketball</li>
              <li>Collecting sneakers</li>
              <li>Cooking</li>
              <li>Watching sports</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
