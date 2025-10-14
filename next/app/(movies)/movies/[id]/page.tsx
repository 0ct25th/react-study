import { API_URL } from "../../../(home)/page";

async function getMovie(id: string) {
  console.log(`Fwetcing movies: ${Date.now()}`);
  await new Promise((resolve => setTimeout(resolve, 3000)));
  const response = await fetch(`${API_URL}/${id}`);

  return response.json();
}

async function getVideos(id: string) {
  console.log(`Fwetcing videos: ${Date.now()}`);
  await new Promise((resolve => setTimeout(resolve, 3000)));
  const response = await fetch(`${API_URL}/${id}/videos`);

  return response.json();
}

export default async function MovieDetail({
  params: {
    id,
  },
}: {
  params: { id: string };
}) {
  console.log('start');
  const [movie, video] = await Promise.all([getMovie(id), getVideos(id)]);
  console.log('end');

  return (
    <h1>{movie.title}</h1>
  )
}