import './InputFilter.css'

interface InputProps {
    searchValue: string,
    setSearchValue: (v: string) => void
}

const InputFilter = ({searchValue, setSearchValue}: InputProps) => (
    <div className="search">
        <input value={searchValue} onChange={(event => setSearchValue(event.target.value))}/>
    </div>
)

export default InputFilter;