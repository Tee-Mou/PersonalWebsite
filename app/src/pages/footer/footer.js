import "./footer.css";

const idLinkMap = {
    "gh": "https://github.com/Tee-Mou",
    "li": "https://www.linkedin.com/in/tennyson-morris"
}

const PersonalLink = ({id}) => (
    <a className='link_btn' id={id} href={idLinkMap[id]}/>
);

export const Footer = () => {
    return (
        <div className="content">
            <p>Check out what I've been doing:</p>
            <div className="links_row1">
                <PersonalLink id="gh"/>
                <PersonalLink id="li"/>
            </div>
        </div>
    )
}

export default Footer;