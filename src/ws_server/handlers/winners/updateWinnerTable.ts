import MessageType from "../../../enums/message.enum";
import { clients, players, setPlayers, setWinners, winners } from "../../../inMemoryDB";

export default function updateWinners(id: string) {
  const currentWinner = players.find((player) => player.id === id);
  if (currentWinner) {
    setPlayers(
      players.map((player) => {
        if (player.id === id) {
          return { ...player, wins: (player.wins! += 1) };
        }
        return player;
      })
    );

    const alreadyInTable = winners.find((player) => player.name === currentWinner?.name);

    if (alreadyInTable) {
      setWinners(
        winners.map((player) => {
          if (player.name === currentWinner?.name) {
            return { ...player, wins: (player.wins += 1) };
          }
          return player;
        })
      );
    } else {
      winners.push({ name: currentWinner.name, wins: currentWinner.wins! });
    }

    const res = {
      type: MessageType.WinnersUpdate,
      data: JSON.stringify(winners),
      id: 0,
    };

    clients.forEach((client) => {
      client.send(JSON.stringify(res));
    });
  }
}
