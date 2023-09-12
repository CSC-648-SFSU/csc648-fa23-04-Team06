import Header from "../components/header"
import jessPFP from "../images/jessPFP.jpg"
import "../styles/jessica.css"

export default function main(){
    return(
        <>
        {/* Feel free to use the Header component to add a subHeader, use prop as I have used in index.js... - ST */}
        <Header headerText="Jessica Christine Rosero" subheaderText="Back-end Team Lead"/>
        <div className = "intro">
        <img src = {jessPFP} alt = "Jessica Christine Rosero" width = "300" class = "img"/>
            <div className = "intro-text">
                <p>Hello! My name is Jessica Christine Rosero, or just Jess. I am a senior at San Francisco State University majoring in Computer Science.
                When I'm not working away at the plethora of schoolwork and projects that I have, I enjoy playing video games like TFT and The Legend of Zelda: Tears Of The Kingdom! I can't wait
                to work on amazing games like these someday!
                </p>
            </div>
        </div>
        </>
    )

}