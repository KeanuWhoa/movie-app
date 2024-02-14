import { Banner } from "@/app/_ui/banner";

async function getMovie(url: string) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.API_TOKEN
        },
        next: {
            revalidate: 86400
        }
    });
    return response.json();
}

export default async function Movie({ params }: { params: { movie_id: number } }) {

    const movie = await getMovie(`https://api.themoviedb.org/3/movie/${params.movie_id}`);
    console.log(movie);

    return (
        <>
            <Banner data={movie} />
        </>
    )
}