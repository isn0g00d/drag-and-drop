import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TitleComponent from "./title/title";
import FooterComponent from "./footer/footer";

const getItems = () => [
  {
    id: "0",
    content: <TitleComponent someFunctionHere={someFunctionHere} />,
    name: "Header"
  },
  {
    id: "1",
    content: <TitleComponent someFunctionHere={someFunctionHere} />,
    name: "Subheader"
  },
  { id: "2", content: "example content..", name: "Paragraph" },
  { id: "3", content: "example content..", name: "Image" },
  { id: "4", content: "example content..", name: "Product" },
  { id: "5", content: "example content..", name: "Other" },
  { id: "6", content: "example content..", name: "Other" },
  { id: "7", content: "example content..", name: "Other" },
  { id: "8", content: "example content..", name: "Other" },
  {
    id: "9",
    content: <FooterComponent someFunctionHere={someFunctionHere} />,
    name: "Footer"
  }
];

const someFunctionHere = newelement => {
  //do what you will with the data that you get here..
  console.log('returned template part', newelement);
};

const reorderElements = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 10 ,
  margin: `0 0 10px 0`,
  background: isDragging ? "lightseagreen" : "lightblue",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 20,
  width: 350,
});

class App extends Component {
  state = {
    items: getItems(10),
    selected:  [],
    chosenTemplate: []
  };

  allItems = {
    sourceItems: "items",
    templateItems: "selected"
  };

  getList = id => this.state[this.allItems[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorderElements(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "templateItems") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.sourceItems,
        selected: result.templateItems
      });
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="templateItems">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.selected.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="sourceItems">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
