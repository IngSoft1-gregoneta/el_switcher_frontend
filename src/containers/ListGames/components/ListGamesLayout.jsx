import PropTypes from "prop-types";

export default function ListGamesLayout({ gamesList }) {
  ListGamesLayout.propTypes = {
    gamesList: PropTypes.array,
  };
  return (
    <div className="mx-auto flex flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-center text-4xl font-bold">El Switcher</h1>

      <div className="container mb-6">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Available Games
        </h2>
        <div className="m-8 flex flex-col bg-slate-300 p-8 text-center">
          {gamesList}
        </div>
      </div>
    </div>
  );
}
