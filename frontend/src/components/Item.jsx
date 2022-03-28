const Item = function ({ item }) {
	return (
		<div className="row">
			<input type="checkbox" name="" id="" />
			<span>{item.text}</span>
			<button>Apagar</button>
		</div>
	);
};

export default Item;
