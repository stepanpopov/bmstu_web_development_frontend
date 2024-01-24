import { Form } from 'react-bootstrap';
import './InputFilter.css'

interface InputProps {
    searchValue: string,
    setSearchValue: (v: string) => void
}

const InputFilter = ({searchValue, setSearchValue}: InputProps) => (
    // <div className="search">
    //     <input style={{width: '50%'}} placeholder='Начните вводить название услуги' value={searchValue} onChange={(event => setSearchValue(event.target.value))}/>
    // </div>
    <Form.Control type="text" value={searchValue} placeholder="Начните вводить название услуги" onChange={(event => setSearchValue(event.target.value))} />
)

export default InputFilter;