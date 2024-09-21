export default function NotFoundPageLayout() {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      id="error-page"
    >
      <h1 className="text-3xl font-extrabold">Oops!</h1>
      <p className="text-lg">This path dosn't exist.</p>
    </div>
  );
}
