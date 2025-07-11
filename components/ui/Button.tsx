import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
  size?: 'sm' | 'md'
  [key: string]: any
}

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  size = 'md',
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center font-semibold rounded transition focus:outline-none focus:ring-2 focus:ring-yellow-300'
  const sizes = size === 'sm' ? 'px-2 py-1 text-sm min-w-[70px]' : 'px-4 py-2 text-base'
  const variants: Record<string, string> = {
    primary: 'bg-yellow-400 text-white hover:bg-yellow-500 disabled:opacity-60',
    secondary: 'bg-white text-neutral-400 border border-neutral-200 hover:bg-neutral-100',
    danger: 'bg-white text-red-400 border border-red-100 hover:bg-red-50'
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        sizes,
        variants[variant] || variants.primary,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
