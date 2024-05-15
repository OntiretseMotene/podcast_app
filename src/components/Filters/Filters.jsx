export const Filters = ({ sortShows, filterShows }) => {
  return (
    <div>
      <input
        type="text"
        id="title-filter"
        name="title-filter"
        onChange={(element) => {
          console.log(element.target.value);
          filterShows(element.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          sortShows("A-Z");
        }}
      ></button>
      <button
        onClick={() => {
          sortShows("Z-A");
        }}
      ></button>
      <button
        onClick={() => {
          sortShows("Ascending");
        }}
      ></button>
      <button
        onClick={() => {
          sortShows("Descending");
        }}
      ></button>
    </div>
  );
};
