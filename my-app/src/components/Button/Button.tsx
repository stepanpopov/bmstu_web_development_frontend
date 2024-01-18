import Button from 'react-bootstrap/Button';

interface Props {
    onClick: () => void
    text: string
}

const MyButton = ({ text, onClick }: Props) => {
    return (
        <Button variant="primary"
            type="submit"
            className="w-100 mt-4"
            onClick={onClick}
            style={{ borderRadius: '10px' }}>
            {text}
        </Button>
    );
};

export default MyButton;
