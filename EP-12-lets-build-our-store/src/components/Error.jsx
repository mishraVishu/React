import { useRouteError } from "react-router";

const Error = () => {
    const err = useRouteError();
    console.log(err);

    return (
        <div className="w-full max-w-xl mx-auto p-2 sm:p-4 text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Oops!!!</h1>
            <h2 className="text-base sm:text-lg mb-2">Something went wrong!!</h2>
            <h3 className="text-sm sm:text-base">{err.status} : {err.statusText}</h3>
        </div>
    )
}

export default Error;