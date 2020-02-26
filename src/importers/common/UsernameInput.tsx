import React from "react";
import TextField, {Input} from "@material/react-text-field";

interface UsernameInputProps {
    value: string;
    onValueChange: (newValue: string) => void;
}

interface UsernameInputState { }

class UsernameInput extends React.Component<UsernameInputProps, UsernameInputState> {
    private handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange(e.currentTarget.value);
    }

    render() {
        return (
            <>
                <TextField
                    label="Username"
                ><Input
                    value={this.props.value}
                    onChange={this.handleValueChange} />
                </TextField>
            </>
        );
    }
}

export default UsernameInput;
