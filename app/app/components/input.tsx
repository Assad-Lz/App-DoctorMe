import { HTMLProps, forwardRef } from "react";

export default interface InputProps extends HTMLProps<HTMLInputElement> {}

const  Input = forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => {
    return (
        <Input
        ref={ref}
        type={type}
        {...props}
        />
    ); 
});

Input.displayName = "Input";

export { Input };