const HierarchyReducer = (state,action) => {

    switch(action.type){
        case 'GET': return action.hierarchyData
        default: 
    }
}

export default HierarchyReducer;