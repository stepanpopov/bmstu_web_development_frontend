import './InputFilter.css'

interface InputProps {
    searchValue: string,
    setSearchValue: (v: string) => void
}

const InputFilter = ({searchValue, setSearchValue}: InputProps) => (
    <div className="search">
        <input style={{width: '50%'}} placeholder='Начните вводить название услуги' value={searchValue} onChange={(event => setSearchValue(event.target.value))}/>
    </div>
)

export default InputFilter;