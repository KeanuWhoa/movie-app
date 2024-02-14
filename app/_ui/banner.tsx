'use client'

export function Banner(props: { data: any }) {
    return (
        <div className="banner">
            <div className="banner__details">
                <h1>{props.data.title}</h1>
                <h5>{props.data.release_date}</h5>
            </div>
            <div className="banner__background">
                <div className="background blur" style={{ 'backgroundImage': `url(https://image.tmdb.org/t/p/original/${props.data.backdrop_path})` }}></div>
            </div>
        </div>
    )
}