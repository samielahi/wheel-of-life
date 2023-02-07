import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen flex-col p-8">
      <h1 className="mb-2 text-2xl text-red">Hmmm...</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl">
        {/* @ts-ignore */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
