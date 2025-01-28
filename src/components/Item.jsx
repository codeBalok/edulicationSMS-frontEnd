import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IoArrowUp } from "react-icons/io5";
import { IoArrowDown } from "react-icons/io5";

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
            <div className="item-content" onClick={handleSelect}>
                {name}
            </div>
            <div ref={drag} className="drag-handle flex">
                <span>
                    <IoArrowUp className='text-black' />
                </span>
                <span>
                    <IoArrowDown className='text-black' />
                </span>
            </div>
        </div>
    );
};

export default Item;



