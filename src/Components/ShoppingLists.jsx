import useFetch from "../Hooks/useFetch";

function ShoppingLists() {
    const [lists, setLists] = useFetch("/checklists");

    const handleDelete = (id) => {
        const updatedLists = lists.filter((blog) => blog.id !== id);
        setLists(updatedLists);
    };

    return (
        <div className="shopping-lists">
            {lists.map((item) => (
                <div className="list-item" key={item.id}>
                    <button onClick={() => handleDelete(item.id)}>
                        Delete
                    </button>
                    &nbsp;
                    {item.title}
                    <div className="small-text">Items: {item.items.length}</div>
                    <br />
                </div>
            ))}
        </div>
    );
}

export default ShoppingLists;
