import Button, { ButtonProps } from 'react-bootstrap/Button';

interface Props extends ButtonProps {
    text: string
}

const MyButton = (props: Props) => {
    const variant = props.variant ?? "primary"
    const type = props.type ?? "submit"
    const className = props.className ?? "w-100 mt-2 mb-2"
    const style = props.style ?? { borderRadius: '10px' }

    return (
        <Button 
            variant={variant}
            type={type}
            className={className}
            style={style}
            {...props}>
            {props.text}
        </Button>
    );
};

export default MyButton;
