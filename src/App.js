import { useEffect, useState } from "react";
import "./styles.css";

// function getDirection(element) {
//   // Initial state
//   var scrollPos = 0;
//   let res = "";
//   // adding scroll event
//   element.addEventListener("scroll", function () {
//     // detects new state and compares it with the new one
//     if (element.getBoundingClientRect().top > scrollPos) res = "up";
//     // document.getElementById('info-box').setAttribute('data-scroll-direction', 'UP');
//     // document.getElementById('info-box').setAttribute('data-scroll-direction', 'DOWN');
//     else res = "down";
//     // saves the new position for iteration.
//     scrollPos = document.body.getBoundingClientRect().top;
//   });
// }

export default function App() {
  const optionHeight = 56;
  const optionLength = 20;

  // const [scrollPos, setScrollPos] = useState(0);
  let optionPointer = 0;
  let direction = "down";
  let scrollPos = 1;
  let lastGap = "";
  const handleScroll = (event) => {
    console.log("=> handleScroll", optionPointer);

    if (optionPointer < 0) {
      optionPointer = 0;
    }

    if (optionPointer > optionLength - 1) {
      optionPointer = optionLength - 1;
    }

    const option = document.querySelectorAll(".row")[optionPointer];
    console.log(`>>> 第${optionPointer}個option`);

    console.log("deltaY", event.deltaY); // onWheel attr

    const wrapper = document.querySelector(".wrapper");

    console.log(option.getBoundingClientRect().top);
    console.log(option.getBoundingClientRect().bottom);
    // console.log("wrapper.scrollTop", wrapper.scrollTop);
    // console.log("option.offsetTop", option.offsetTop);
    document.querySelector(".log").innerHTML = `
    >>> 第${optionPointer}個option <br/>
    wrapper.scrollTop = ${wrapper.scrollTop} <br/>
    option.offsetTop = ${option.offsetTop} <br/>
    option.offsetTop + optionHeight =  ${option.offsetTop + optionHeight}<br/>
    option.offsetTop - optionHeight =  ${option.offsetTop - optionHeight}<br/>
    `;

    // if (wrapper.scrollTop < option.offsetTop + optionHeight) {
    if (event.deltaY === 1 || wrapper.scrollTop > lastGap) {
      direction = "down"; // 往下滑
      document.querySelector(".print").innerHTML = "往下滑";
      // } else if (wrapper.scrollTop > option.offsetTop) {
    } else if (event.deltaY === -1 || wrapper.scrollTop < lastGap) {
      direction = "up"; // 往上滑
      document.querySelector(".print").innerHTML = "往上滑";
    }

    // 往下滑（選項往上跑）, event.deltaY = 1

    // if (
    //   direction === "down" &&
    //   wrapper.getBoundingClientRect().top > option.getBoundingClientRect().top
    // ) {
    if (event.deltaY === 1) {
      // 滾出邊界
      console.log("down pointer", optionPointer);
      if (optionPointer > optionLength - 1) {
        console.log("down optionLength", optionLength);
        optionPointer = optionLength - 1;
        document.querySelectorAll(".row")[optionPointer].style.backgroundColor =
          "yellow";
      } else {
        document.querySelectorAll(".row")[optionPointer].style.backgroundColor =
          "yellow";
        optionPointer++;
      }

      option.style.backgroundColor = "transparent";
    }

    // 往上捲（選項往下跑）, event.deltaY = -1
    // 目前這段都判斷錯誤
    // if (
    //   direction === "up" &&
    //   wrapper.getBoundingClientRect().top <
    //     option.getBoundingClientRect().bottom
    // ) {
    if (event.deltaY === -1) {
      // 滾出邊界

      console.log("up pointer", optionPointer);
      if (optionPointer < 0) {
        optionPointer = 0;
        document.querySelectorAll(".row")[optionPointer].style.backgroundColor =
          "green";
      } else {
        document.querySelectorAll(".row")[optionPointer].style.backgroundColor =
          "green";
        optionPointer--;
      }

      option.style.backgroundColor = "transparent";
    }

    lastGap = wrapper.scrollTop;
  };

  const handleTouchMove = () => {
    console.log("handleTouchMove");
  };

  // useEffect(() => {
  //   const wrapper = document.querySelector(".wrapper");
  //   wrapper.onScroll = (event) => {
  //     handleScroll(event);
  //   };
  // }, []);

  return (
    <div className="App">
      <h1>測試 scroll</h1>
      <div className="print"></div>
      <div className="log"></div>
      <div className="container">
        <div className="tool">
          <div>取消</div>
          <div>選擇</div>
        </div>
        <div
          className="wrapper"
          onWheel={handleScroll}
          onScroll={handleScroll}
          onTouchStart={handleTouchMove}
        >
          <div className="row">[0] 09:00</div>
          <div className="row">[1] 10:00</div>
          <div className="row">[2] 11:00</div>
          <div className="row">[3] 12:00</div>
          <div className="row">[4] 13:00</div>
          <div className="row">[5] 14:00</div>
          <div className="row">[6] 15:00</div>
          <div className="row">[7] 16:00</div>
          <div className="row">[8] 17:00</div>
          <div className="row">[9] 18:00</div>
          <div className="row">[10] 19:00</div>
          <div className="row">[11] 20:00</div>
          <div className="row">[12] 21:00</div>
          <div className="row">[13] 22:00</div>
          <div className="row">[14] 23:00</div>
          <div className="row">[15] 00:00</div>
          <div className="row">[16] 01:00</div>
          <div className="row">[17] 02:00</div>
          <div className="row">[18] 03:00</div>
          <div className="row">[19] 04:00</div>
        </div>
      </div>
    </div>
  );
}
