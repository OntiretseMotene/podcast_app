import { genres } from "../../types/genres";
export const Filters = ({ sortShows, filterShows }) => {
  return (
    <div >
      <input
        type="text"
        id="title-filter"
        name="title-filter"
        onChange={(element) => {
          
          filterShows(element.target.value);
        }}
      ></input>
      <div >
        <button className="filter-buttons"
          onClick={() => {
            sortShows("A-Z");
          }}
        >
          A-Z
        </button>
        <button className="filter-buttons"
          onClick={() => {
            sortShows("Z-A");
          }}
        >
          Z-A
        </button>
        <button className="filter-buttons"
          onClick={() => {
            sortShows("Ascending");
          }}
        >
          Ascending
        </button>
        <button className="filter-buttons"
          onClick={() => {
            sortShows("Descending");
          }}
        >
          Descending
        </button>
      </div>
      <div>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(1);
          }}
        >
          {genres[1]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(2);
          }}
        >
          {genres[2]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(3);
          }}
        >
          {genres[3]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(4);
          }}
        >
          {genres[4]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(5);
          }}
        >
          {genres[5]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(6);
          }}
        >
          {genres[6]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(7);
          }}
        >
          {genres[7]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(8);
          }}
        >
          {genres[8]}
        </button>
        <button className="filter-buttons"
          onClick={() => {
            filterShows(9);
          }}
        >
          {genres[9]}
        </button>
      </div>
    </div>
  );
};
