import { forwardRef, HTMLAttributes } from "react";

export default interface LabelProps extends HTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, id, ...props }, ref) => {
    return (
      <label ref={ref} htmlFor={id} {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = "Labbel";

export { Label };
