export const formatTimestamp = (timestamp: {
    _seconds: number;
    _nanoseconds: number;
}) => {
    return new Date(timestamp._seconds * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
}

export const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min read`
}