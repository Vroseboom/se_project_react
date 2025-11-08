import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext.jsx";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]}
          &deg; {currentTempUnit}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
