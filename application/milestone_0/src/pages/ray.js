import Header from "../components/header"
import '../components/raySettings/ray.css';
import profileImage from "../components/raySettings/aboutProfile.png" 

export default function(){
    return(
        <>
        <Header/>
        <div className="title-container">
            <h1 className="my-title">Ray Dela Cruz</h1>
            <h1 className="my-subtitle">Front End Leader</h1>
        </div>
        <div className="flex-container">
            <div className="flex-item">
                <div className="item-content-layout">
                    <div className="item-content-img">
                        <img
                          src={profileImage}
                          alt="Profile Image"
                          style={{ width: '281px', height: '400px' }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-item">               
                    <h2 className="item-title">About Me</h2>
                <div className="item-content">
                    <p className="reg-text">
                        Hi I'm Ray and currently a Senior and scheduled 
                        to graduate sprint 2024. I am a transfer from Napa
                        Valley College. Going in to this field is a career
                        change from my work in mental health for the state.
                        It has proven to be a big change from what I have 
                        been used to but, it has been a welcome challenge.
                    </p>
                    <p className="reg-text">
                        My interests outside of studying include video games
                         (playing Baldur's Gate 3). I like to watch
                          K/C dramas (watching A Time Called You). 
                          I also like to attend concerts (attending Hanabie 
                          next month).          
                    </p>
                    <p className="reg-text">
                        My goals after I graduate is to work somewhere I 
                        will be equally confident at like my former career 
                        with a little more success.
                    </p>
                </div>        
            </div>
        </div>
        </>
    )
}