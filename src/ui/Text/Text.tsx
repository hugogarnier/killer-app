import React, { FC, ReactNode } from 'react';
import { Text as TextRN } from 'react-native';

type TextProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode | ReactNode[];
  className?: string;
};

export const Text: FC<TextProps> = ({ variant = 'primary', children, className, ...props }) => {
  return (
    <TextRN
      className={`${
        (variant === 'primary' && 'font-ibmReg') ||
        (variant === 'secondary' && 'font-ibmBold') ||
        'font-ibmLight'
      } ${className}`}
      {...props}
    >
      {children}
    </TextRN>
  );
};
