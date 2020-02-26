import React from "react";
import TextField, {Input} from "@material/react-text-field";

interface PasswordInputProps {
    value: string;
    onValueChange: (newValue: string) => void;
}

interface PasswordInputState { }

class PasswordInput extends React.Component<PasswordInputProps, PasswordInputState> {
    private handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange(e.currentTarget.value);
    }

    render() {
        return (
            <>
                <TextField
                    label="Password"
                ><Input
                    type="password"
                    value={this.props.value}
                    onChange={this.handleValueChange} />
                </TextField>
            </>
        );
    }
}

export default PasswordInput;
