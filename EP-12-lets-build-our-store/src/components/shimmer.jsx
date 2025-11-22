const Shimmer = () => {
    return (
        <div className="shimmer-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2 sm:p-4">
            {[...Array(16)].map((_, i) => (
                <div key={i} className="shimmer-card h-32 sm:h-40 w-full bg-gray-200 rounded-lg animate-pulse duration-75"></div>
            ))}
        </div>
    )
}

export default Shimmer;