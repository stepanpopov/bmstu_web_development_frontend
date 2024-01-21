import Button from 'react-bootstrap/Button';

interface Props {
    onClick: () => void
    text: string
    disabled?: boolean
}

const MyButton = ({ text, onClick, disabled }: Props) => {
    return (
        <Button variant="primary"
            disabled={disabled}
            type="submit"
            className="w-100 mt-4"
            onClick={onClick}
            style={{ borderRadius: '10px' }}>
            {text}
        </Button>
    );
};

export default MyButton;
