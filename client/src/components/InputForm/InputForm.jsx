// import { WrapperInputStyle } from "./style";

// const InputForm = (props) => {
//     // const [valueInput, setValueInput] = useState('');
//     const { placeholder = 'Nhập text', ...rests } = props;
//     const handleOnchangeInput = (e) => {
//         props.handleOnchange(e.target.value)
//     }
//     return (
//         <WrapperInputStyle placeholder={placeholder} valueInput={props.value} {...rests} onChange={handleOnchangeInput} />
//     )
// }

// export default InputForm;
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
    // Tách handleOnchange và value khỏi phần còn lại để tránh truyền xuống DOM
    const { placeholder = 'Nhập text', handleOnChange, value, ...rests } = props;

    const handleOnChangeInput = (e) => {
        if (typeof handleOnChange === 'function') {
            handleOnChange(e.target.value);
        }
    };

    return (
        <WrapperInputStyle
            placeholder={placeholder}
            value={value}
            {...rests}
            onChange={handleOnChangeInput}
        />
    );
};

export default InputForm;


