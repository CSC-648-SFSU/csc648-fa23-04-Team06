import Header from "../components/header"
import RyanPhoto from "../images/ryan.jpg"
import "../styles/ryan.css"

export default function main(){
    return(
        <div className="intro">
          {/* Feel free to use the Header component to add a subHeader, use prop as I have used in index.js... - ST */}
          <Header headerText={"Ryan Tong"} subheaderText={"Full-Stack Developer"}/>

          <img src={RyanPhoto} alt="Ryan Tong" />

          <p className="intro-text">
            Hello, I'm Ryan Tong. I am currently a senior at San Francisco State University majoring in computer science.
            I'm currently deciding if I want to go into Databases, Artificial Intelligence, or Game Development.
            My hobbies board games(Monopoly, Chess) and video games(League, TFT, recently got back into ROTMG) with friends, 
            and reading manga(One piece, recently started detective conan and baki) and watching youtube when I am alone.
          </p>
        </div>
    )
}
