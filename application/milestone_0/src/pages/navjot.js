import Header from "../components/header"

export default function main(){
    return(
        <>
        {/* Feel free to use the Header component to add a subHeader, use prop as I have used in index.js... - ST */}
        <Header headerText="Navjot Singh" subheaderText = "Git Master"/>

        <section>
        <div>
        <h2>About my self:</h2>
        <message>
          Hello!
          Hello, I'm Navjot  Singh, and this is my digital space. I'm a tech-savvy automotive enthusiast, and here, 
          I'll be sharing my journey through the world of computer science and my deep-rooted love for cars as I strive for a career in cloud software and cybersecurity.
        </message>
        
        </div>

        <div>
        <h2>Hobbies:</h2>
        <ul>
          <li>Working on cars</li>
          <li>Drawing</li>
          <li>Basketball</li>
          <li>Collecting sneakers</li>
          <li>Cooking</li>
          <li>Watching sports</li>
        </ul>
        </div>
      </section>

        </>
    )
}