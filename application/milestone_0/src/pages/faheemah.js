import Header from "../components/header"
import "../styles/faheemah.scss"; 
import FaheemahPhoto from "../images/faheemah.jpeg"

export default function error(){
    return(
        <>
        {/* Feel free to use the Header component to add a subHeader, use prop as I have used in index.js... - ST */}
        <div className = "title">
        <Header headerText="Faheemah Shaikh" subheaderText="Scrum Master"/>
        </div>
        <div className = "introduction">
        <img
            src={FaheemahPhoto} 
          />
          <div className="text">
        <p>Hey everyone! My name is Faheemah Shaikh and I'm a senior at San Francisco State majoring in Computer Science.
        In my free time, I enjoy going to the gym and eating good food. 💪😋</p>
        <div>
        <p>Here is my LinkedIn: <a href="www.linkedin.com/in/f-s-567921168" target="_blank">LinkedIn</a> </p>
        </div>
        <p>Here is a website I made for my last internship: <a href="https://french-foodie.glitch.me/" target="_blank">French Foodie</a> </p>
        </div>
        </div>
        </>
    )
}