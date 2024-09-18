import PropTypes from "prop-types";

export default function ListGamesLayout({ games }) {
  ListGamesLayout.propTypes = {
    games: PropTypes.array,
  };

  let gamesList;
  if (games != null) {
    gamesList = games.map((game) => (
      <tr
        key={game.id}
        className="border-b border-r border-emerald-200 bg-lime-100 text-cyan-950 hover:bg-cyan-100"
      >
        <td scope="row" className="center px-6 py-4">
          {/* TODO: Devolver del backend cuantos jugadores hay */}
          2/4
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-medium">{game.name}</td>
        <td className="px-6 py-4">Pepe</td>
        <td className="px-6 py-4 text-right">
          <button
            type="button"
            className="mb-2 me-2 border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Unirse
          </button>
        </td>
      </tr>
    ));
  }
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center p-4">
      <h1 className="m-8 text-center font-serif text-4xl font-bold text-emerald-900">
        EL SWITCHER
      </h1>

      <div className="container mb-6 pb-4 pt-4">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-lime-200 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Jugadores
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre de la partida
                </th>
                <th scope="col" className="px-6 py-3">
                  Creada por
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>{gamesList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
