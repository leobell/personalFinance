const getInitials = (name = '') => {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('')
}

const Avatar = ({ name, size = 32 }) => {
    return (
        <div
            title={name}
            aria-label={name}
            style={{ width: size, height: size }}
            className="flex shrink-0 items-center justify-center rounded-full bg-[#2a78d6] text-xs font-semibold text-white dark:bg-[#3987e5]"
        >
            {getInitials(name)}
        </div>
    )
}

export default Avatar
