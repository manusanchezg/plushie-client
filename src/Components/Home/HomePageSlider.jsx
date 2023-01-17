import Carousel from "react-bootstrap/Carousel";

function HomePageSlider({ gallery }) {
  return (
    <Carousel>
      {gallery.length &&
        gallery.map((img, idx) => (
          <Carousel.Item interval={2000} key={idx}>
            <img
              className="d-block"
              src={img}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default HomePageSlider;