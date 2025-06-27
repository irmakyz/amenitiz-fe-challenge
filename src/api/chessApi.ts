const API_BASE = process.env.NEXT_PUBLIC_API_BASE;


export async function fetchGrandmasters(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/titled/GM`);
  if (!res.ok) throw new Error("Failed to fetch grandmasters");
  const data = await res.json();
  return data.players;
}

export async function fetchPlayer(username: string) {
  const res = await fetch(`${API_BASE}/player/${username}`);
  if (!res.ok) throw new Error("Player not found");
  return res.json();
}

export async function fetchPlayerStats(username: string) {
  const res = await fetch(`${API_BASE}/player/${username}/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
