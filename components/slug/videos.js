import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'


const Videos = ({title}) => {
    return (
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        className="w-11/12 my-8 lg:hidden"
        showStatus={false}
        swipeable={true}
        showThumbs={false}
        >
        {title.videos.map((vid) => {
            return (
                <div key={vid.id}>
                    <iframe className="h-72" src={`https://www.youtube.com/embed/${vid.video_id}`}></iframe>
                </div>
            )
        })}
        </Carousel>
    )
}

export default Videos;