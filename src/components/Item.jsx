// import React from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// const Item = ({ id, name, order, isSelected, onSelect, onMove }) => {
//     const [, dragRef] = useDrag({
//         type: 'ITEM',
//         item: { id, order },
//     });

//     const [, dropRef] = useDrop({
//         accept: 'ITEM',
//         hover: (draggedItem) => {
//             if (draggedItem.order !== order) {
//                 onMove(draggedItem.order, order);
//                 draggedItem.order = order;
//             }
//         },
//     });

//     const handleClick = () => {
//         onSelect(id);
//     };

//     return (
//         <div
//             ref={(node) => dragRef(dropRef(node))}
//             className={`item ${isSelected ? 'selected' : ''}`}
//             onClick={handleClick}
//             style={{
//                 border: '1px solid #ccc',
//                 padding: '8px',
//                 margin: '4px',
//                 cursor: 'pointer',
//                 backgroundColor: isSelected ? '#f0f8ff' : '#fff',
//             }}
//         >
//             {name}
//         </div>
//     );
// };

// export default Item;





import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Item = ({ id, name, order, isSelected, onSelect, onMove }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { id, order },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ isOver }, drop] = useDrop({
        accept: 'ITEM',
        drop: (item) => {
            if (item.order !== order) {
                onMove(item.order, order);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const handleSelect = () => {
        onSelect(id);
    };

    return (
        <div
            ref={drop}
            className={`item ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isOver ? 'over' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div ref={drag} className="drag-handle">
                ☰
            </div>
            <div className="item-content" onClick={handleSelect}>
                {name}
            </div>
        </div>
    );
};

export default Item;



