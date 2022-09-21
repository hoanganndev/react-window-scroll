import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import * as faker from "faker";

import testImage from "../../../assets/testImg.png";
import { useIntersection } from "./useIntersection";
import { useWindowResize } from "./useWindowResize";
import "./WindowScroll.scss";

const styles = {
  row: {
    fontFamily: "system-ui",
    padding: "20px",
    borderBottom: "1px solid #ccc",
    boxSizing: "border-box",
  },
};

const Row = ({ data, index, setSize, windowWidth }) => {
  const rowRef = useRef();
  const isEven = index % 2 === 0;

  const { visible } = useIntersection(rowRef, index);

  console.log(">>> check visible", visible);

  useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);

  return (
    <div
      className="post"
      ref={rowRef}
      my-name={`post-${index}`}
      style={{
        ...styles.row,
        backgroundColor: isEven ? "#df82c01a" : "transparent",
      }}
    >
      <img src={testImage} alt="product image" className="post__img" />
      <div className="post__content">
        <h3 className="post__name">{data[index].title}</h3>
        <p className="post__desc">{data[index].body}</p>
      </div>
    </div>
  );
};

const WindowScroll = () => {
  const arr = [];
  const data = new Array(200000).fill().map((value, index) => ({
    id: index,
    title: faker.lorem.words(5),
    body: faker.lorem.sentences(4),
  }));
  const listRef = useRef();
  const rowHeights = useRef({});
  const [windowWidth, windowHeight] = useWindowResize();
  const [totalViewport, setTotalViewport] = useState(0);

  const setSize = useCallback((index, size) => {
    //size: height of each row
    rowHeights.current = { ...rowHeights.current, [index]: size };
    listRef.current.resetAfterIndex(index); //reset and caculate height of each row
  }, []);

  const getSize = index => rowHeights.current[index] || 50;

  return (
    <List
      className="list-posts"
      ref={listRef}
      height={windowHeight}
      width="100%"
      itemCount={data.length}
      itemSize={getSize}
      itemData={data}
    >
      {({ data, index, style }) => (
        <div style={style}>
          <Row
            data={data}
            index={index}
            setSize={setSize}
            windowWidth={windowWidth}
            // viewPortVisible={viewPortVisible}
          />
        </div>
      )}
    </List>
  );
};
export default WindowScroll;
