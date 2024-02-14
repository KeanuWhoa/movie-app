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

export default async function Movie({ params }: { params: { tv_id: number } }) {

    const tv_show = await getMovie(`https://api.themoviedb.org/3/tv/${params.tv_id}`);
    console.log(tv_show);

    return (
        <>
            <div className="banner">
                <div className="banner__background">
                    <div className="background blur" style={{ 'backgroundImage': `url(https://image.tmdb.org/t/p/original/${tv_show.backdrop_path})` }}></div>
                </div>
            </div>
            <h1>{tv_show.original_title}</h1>
            <h5>{tv_show.release_date}</h5>
        </>
    )
}