const Filter = ({ filterName, handleFilterName }) => {
  return (
    <p>
      filter shown with <input value={filterName} onChange={handleFilterName} />
    </p>
  );
}

export default Filter;