import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__button" type="button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.slice(0, 6).map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}
