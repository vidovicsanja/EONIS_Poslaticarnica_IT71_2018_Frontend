const SortComponent = ({ labels, selectedLabel, onSort }) => {
  const handleSort = (e) => {
    onSort(e?.target?.value);
  };

  return (
    <select
      className="input input-bordered input-sm"
      defaultValue={selectedLabel}
      onChange={handleSort}
    >
      {labels?.map((label, idx) => (
        <option
          key={`sort__label__${idx + 1}`}
          value={label}
          // selected={label === selectedLabel}
        >
          {label}
        </option>
      ))}
    </select>
  );
};

export default SortComponent;
