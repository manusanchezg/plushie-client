import Carousel from "react-bootstrap/Carousel";

function Slider({ gallery }) {
  return (
    <div>
      <Carousel>
        {gallery.length &&
          gallery.map((img, idx) => (
            <Carousel.Item interval={2000} key={idx}>
              <img className="d-block" src={img.url} alt="First slide" />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

export default Slider;
