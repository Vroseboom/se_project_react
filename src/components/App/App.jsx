import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext.jsx";
import { getItems, addItem, removeItem } from "../../utils/clothingApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues, handleReset) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleReset();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = (itemToDelete) => {
    console.log(itemToDelete._id);
    removeItem(itemToDelete._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== itemToDelete._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch filtered weather data:", error);
      });

    getItems()
      .then((data) => {
        setClothingItems(data.sort((a, b) => b._id - a._id));
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app_content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
