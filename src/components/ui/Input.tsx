import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, AlertCircle, Check } from 'lucide-react';

/**
 * UXP-004: 3초 답변 (Easy to Answer)
 * - 자동채움/최근값/추천/질문 분해로 입력 부담 최소화
 * - 3초 안에 답할 수 있도록 설계
 */

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    success?: boolean;
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    suggestions?: string[];
    onSuggestionSelect?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    helperText,
    error,
    success,
    size = 'md',
    leftIcon,
    rightIcon,
    clearable,
    onClear,
    suggestions,
    onSuggestionSelect,
    type = 'text',
    className = '',
    value,
    onChange,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const isPassword = type === 'password';

    const sizeStyles = {
        sm: 'h-10 text-sm px-3',
        md: 'h-[var(--uxp-input-height)] text-base px-4',
        lg: 'h-14 text-lg px-5',
    };

    const getInputState = () => {
        if (error) return 'error';
        if (success) return 'success';
        return 'default';
    };

    const stateStyles = {
        default: 'border-[var(--uxp-color-border)] focus:border-[var(--uxp-color-border-focus)] focus:ring-1 focus:ring-[var(--uxp-color-primary)]',
        error: 'border-[var(--uxp-color-error)] focus:border-[var(--uxp-color-error)] focus:ring-1 focus:ring-[var(--uxp-color-error)]',
        success: 'border-[var(--uxp-color-success)] focus:border-[var(--uxp-color-success)] focus:ring-1 focus:ring-[var(--uxp-color-success)]',
    };

    const handleSuggestionClick = (suggestion: string) => {
        onSuggestionSelect?.(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="flex flex-col gap-1.5">
            {/* Label */}
            {label && (
                <label className="text-sm font-medium text-[var(--uxp-color-text)]">
                    {label}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Left Icon */}
                {leftIcon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--uxp-color-text-muted)]">
                        {leftIcon}
                    </div>
                )}

                {/* Input */}
                <input
                    ref={ref}
                    type={isPassword && showPassword ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => suggestions && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className={`
            w-full
            bg-white
            border-2 rounded-[var(--uxp-input-radius)]
            outline-none transition-all
            placeholder:text-[var(--uxp-color-text-disabled)]
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${sizeStyles[size]}
            ${stateStyles[getInputState()]}
            ${leftIcon ? 'pl-12' : ''}
            ${(rightIcon || clearable || isPassword) ? 'pr-12' : ''}
            ${className}
          `.replace(/\s+/g, ' ').trim()}
                    {...props}
                />

                {/* Right Icons */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {/* Clear Button - UXP-004 */}
                    {clearable && value && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="p-1 text-[var(--uxp-color-text-muted)] hover:text-[var(--uxp-color-text)] transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}

                    {/* Password Toggle */}
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 text-[var(--uxp-color-text-muted)] hover:text-[var(--uxp-color-text)] transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    )}

                    {/* Status Icons */}
                    {error && <AlertCircle className="w-5 h-5 text-[var(--uxp-color-error)]" />}
                    {success && !error && <Check className="w-5 h-5 text-[var(--uxp-color-success)]" />}

                    {/* Custom Right Icon */}
                    {rightIcon && !error && !success && (
                        <span className="text-[var(--uxp-color-text-muted)]">{rightIcon}</span>
                    )}
                </div>

                {/* Suggestions Dropdown - UXP-004: 추천으로 입력 부담 최소화 */}
                {showSuggestions && suggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--uxp-color-border)] rounded-lg shadow-lg z-10 overflow-hidden">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors border-b last:border-b-0 border-[var(--uxp-color-border)]"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Helper / Error Text */}
            {(helperText || error) && (
                <p className={`text-xs ${error ? 'text-[var(--uxp-color-error)]' : 'text-[var(--uxp-color-text-muted)]'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
