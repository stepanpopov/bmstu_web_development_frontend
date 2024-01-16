import './Footer.css'

interface Props {
    text: string
}

const Footer = ({text}: Props) => (
    <footer>
        <p>{text}</p>
    </footer>
)

export default Footer