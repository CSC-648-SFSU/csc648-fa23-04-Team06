import Header from "../components/header";
import "../styles/sahej.scss"; // Replace with the actual path to your CSS file
import SahejTuliImg from "../images/sahejtuli.jpeg"

export default function main() {
    const handlePortfolioButtonClick = () => {
        window.location.href = 'https://sahejtuli.com';
      };
    
      const handleLinkedInButtonClick = () => {
        window.location.href = 'https://www.linkedin.com/in/sahej-tuli-9026a4223';
      };

      const handlePhotographyButtonClick = () => {
        window.location.href = 'https://www.instagram.com/pitcher_plant/';
      };

  return (
    <div>
      <Header headerText={"Sahej Tuli"} subheaderText={"Team Lead"} />
      <div className="intro-section">
        <div>
          <img
            src={SahejTuliImg} 
            alt="Sahej Tuli"
          />
        </div>
        <div>
        <h2>🙏 Namaste, everyone! </h2>
          <h3>I'm Sahej Tuli, currently a senior at San Francisco State University majoring in computer science. My journey in the tech world began way back in 7th grade when I discovered my love for creating web applications. Now, my big dream is to become a software engineer and perhaps, down the road, kickstart my very own company! 😄🚀<br/><br/> Beyond coding, I love to do photography, enjoy playing ♟️ chess<br/> and have a passion for 🧑🏻‍🍳 cooking.</h3>
          <div className="buttons">
        <button className="button-cta" onClick={handlePortfolioButtonClick}>
          Portfolio ➔
        </button>
        <button className="button-basic-1" onClick={handleLinkedInButtonClick}>
          LinkedIn ➔
        </button>
        <button className="button-basic-2" onClick={handlePhotographyButtonClick}>
          Photography ➔
        </button>
      </div>

        </div>
      </div>
    </div>
  );
}
