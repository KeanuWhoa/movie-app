import Link from "next/link";

// returns TV, Movies and Actors; need to filter Actors out after return
async function getTrendingToday() {
    const response = await fetch("https://api.themoviedb.org/3/trending/all/day", {
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

// returns image sizes [no idea how long this remains the same, leaving this here in case ever need to ping again]
async function getConfig() {
    const response = await fetch("https://api.themoviedb.org/3/configuration", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.API_TOKEN
        }
    });
    return response.json();
}

function sortDates(a: any, b: any) {
    if (a.release_date > b.release_date) {
        return -1;
    }
    if (a.release_date < b.release_date) {
        return 1;
    }
    return 0;
}

function sortPopularity(a: any, b: any) {
    if (a.popularity > b.popularity) {
        return -1;
    }
    if (a.popularity < b.popularity) {
        return 1;
    }
    return 0;
}

export default async function Home() {
    const trendingTodayJSON = await getTrendingToday();
    const trendingTodayItems = trendingTodayJSON.results;
    let trendingTodaySorted = trendingTodayItems.sort(sortPopularity);

    const featuredMedia = trendingTodaySorted[0];
    trendingTodaySorted.splice(0, 1);

    const trendingToday = trendingTodaySorted.map((trending: any, i: number) => {
        let percentage = trending.vote_average * 10;
        let rating = Math.floor(trending.vote_average * 10);

        return (
            <div className="movie" key={i}>
                <Link href={`/${trending.media_type}/${trending.id}`}>
                    <div className="movie__poster">
                        <div className="poster" style={{ 'backgroundImage': `url(https://image.tmdb.org/t/p/w780/${trending.backdrop_path})` }}></div>
                    </div>
                </Link>
                <div className="movie__details">
                    <h4 className="fw-400">{trending.title ? trending.title : trending.name}</h4>
                    <div className="movie__rating" style={{ ['--percentage' as any]: percentage }}>
                        {rating}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <section className="banner">
                <div className="banner__details">
                    <h1>{featuredMedia.title}</h1>
                    <p>{featuredMedia.overview}</p>
                </div>
                <div className="banner__background">
                    <div className="background" style={{ 'backgroundImage': `url(https://image.tmdb.org/t/p/original/${featuredMedia.backdrop_path})` }}></div>
                </div>
            </section>
            <section className="section--main section--trending">
                <h2 className="section__header">Trending</h2>
                <section className="movies">
                    {trendingToday}
                </section>
            </section>
        </>
    )
}
