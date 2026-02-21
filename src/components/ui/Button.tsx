import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * UXP-003: Clear Action (명확한 행동)
 * - CTA는 "행동+결과" 형태로 표준화
 * - Primary CTA가 한눈에 명확해야 함
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold transition-all duration-100
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const variantStyles = {
    primary: `
      bg-[var(--uxp-color-primary)] text-white
      hover:bg-[var(--uxp-color-primary-hover)]
      focus:ring-[var(--uxp-color-primary)]
    `,
    secondary: `
      bg-[var(--uxp-color-primary-light)] text-[var(--uxp-color-primary)]
      hover:bg-blue-100
      focus:ring-[var(--uxp-color-primary)]
    `,
    outline: `
      border-2 border-[var(--uxp-color-border)] text-[var(--uxp-color-text)]
      hover:border-[var(--uxp-color-primary)] hover:text-[var(--uxp-color-primary)]
      focus:ring-[var(--uxp-color-primary)]
    `,
    ghost: `
      text-[var(--uxp-color-text-secondary)]
      hover:bg-gray-100
      focus:ring-gray-300
    `,
    danger: `
      bg-[var(--uxp-color-error)] text-white
      hover:bg-red-600
      focus:ring-[var(--uxp-color-error)]
    `,
  };

  const sizeStyles = {
    sm: `
      h-[var(--uxp-button-height-sm)] px-4
      text-[var(--uxp-font-sm)]
      rounded-lg
    `,
    md: `
      h-[var(--uxp-button-height)] px-6
      text-[var(--uxp-font-base)]
      rounded-[var(--uxp-button-radius)]
    `,
    lg: `
      h-14 px-8
      text-[var(--uxp-font-lg)]
      rounded-[var(--uxp-button-radius)]
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;

