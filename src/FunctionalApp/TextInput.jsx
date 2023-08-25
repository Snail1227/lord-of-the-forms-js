export function TextInput( {labelText, inputProps} ) {
    return (
        <div>
            <div className="input-wrap"> 
                <label>{labelText}:</label>
                <input type="text" {...inputProps} /> 
            </div>
        </div>
    );
}