import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVidoes from "../../../../components/movie-videos";




export default async function MovieDetail({
  params: {
    id,
  },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h3>Movie detail page</h3>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVidoes id={id} />
      </Suspense>
    </div>
  )
}