export default function Header({ headerText, subheaderText }) {
    return (
        <div>
            <h1 className="header-text">{headerText}</h1>
            <h2 className="subheader-text">{subheaderText}</h2>
        </div>
    )
}
