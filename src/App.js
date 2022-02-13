import { useEffect, useState } from "react";
// import "./styles.css";
import "./styles.scss";

const timePickerOptions = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00"
];

export default function App() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pointer, setPointer] = useState(0);
  const [inputTime, setInputTime] = useState("");

  const optionHeight = 56;
  const optionLength = timePickerOptions.length;

  let optionPointer = 0;

  let lastGap = "";
  const handleScroll = (event) => {
    if (optionPointer < 1) {
      optionPointer = 0;
    }

    if (optionPointer > optionLength - 1) {
      optionPointer = optionLength - 1;
    }

    const option = document.querySelectorAll(".row")[optionPointer];
    console.log(`>>> 第${optionPointer}個option`);

    // console.log("deltaY", event.deltaY); // onWheel attr

    const wrapper = document.querySelector(".wrapper");

    // console.log(option.getBoundingClientRect().top);
    // console.log(option.getBoundingClientRect().bottom);

    document.querySelector(".log").innerHTML = `
    >>> 第${optionPointer}個option <br/>
    wrapper.scrollTop = ${wrapper.scrollTop} <br/>
    option.offsetTop = ${option.offsetTop} <br/>
    option.offsetTop + optionHeight =  ${option.offsetTop + optionHeight}<br/>
    option.offsetTop - optionHeight =  ${option.offsetTop - optionHeight}<br/>
    `;

    // 已經被捲到看不到選項的數量
    const overOptionQty = Math.floor(wrapper.scrollTop / optionHeight) || 0;
    optionPointer = overOptionQty + 1;

    // 往下滑（選項往上跑）, event.deltaY = 1
    if (event.deltaY === 1 || wrapper.scrollTop > lastGap) {
      document.querySelector(".print").innerHTML = "往下滑";
      // 滾出邊界

      option.classList.remove("active");

      if (optionPointer >= optionLength - 1) {
        optionPointer = optionLength - 1;
        const el = document.querySelectorAll(".row")[optionPointer];
        el.classList.add("active");
      } else {
        const el = document.querySelectorAll(".row")[optionPointer];
        el.classList.add("active");
        optionPointer++;
      }
    }

    // 往上捲（選項往下跑）, event.deltaY = -1
    if (event.deltaY === -1 || wrapper.scrollTop < lastGap) {
      // 滾出邊界
      document.querySelector(".print").innerHTML = "往上滑";

      option.classList.remove("active");

      if (optionPointer <= 1) {
        optionPointer = 0;
        const el = document.querySelectorAll(".row")[optionPointer];
        el.classList.add("active");
      } else {
        const el = document.querySelectorAll(".row")[optionPointer];
        el.classList.add("active");
        optionPointer--;
      }
    }

    setPointer(optionPointer);
    lastGap = wrapper.scrollTop;
  };

  const handleTouchMove = () => {
    console.log("handleTouchMove");
  };

  const options = timePickerOptions.map((option, index) => {
    return (
      <div key={option} className="row">
        {`[${index}] ${option}`}
      </div>
    );
  });

  const updateInputValue = () => {
    const time = timePickerOptions[pointer];
    console.log(time);
    setInputTime(time);
    setPickerOpen(false);
  };

  return (
    <div className="App">
      <div>
        測試 Mobile Time Picker:
        <input
          type="text"
          className={"timeInput"}
          onClick={() => setPickerOpen(true)}
          defaultValue={inputTime}
        />
      </div>
      <div className="print"></div>
      <div className="log"></div>
      {pickerOpen && (
        <div className="container">
          <div className="tool">
            <div>
              <button
                className={"button"}
                type="button"
                onClick={() => setPickerOpen(false)}
              >
                取消
              </button>
            </div>
            <div>
              <button
                className={"button"}
                type="button"
                onClick={() => {
                  updateInputValue();
                }}
              >
                選擇
              </button>
            </div>
          </div>
          <div
            className="wrapper"
            onWheel={handleScroll}
            onScroll={handleScroll}
            onTouchStart={handleTouchMove}
          >
            {options}
          </div>
        </div>
      )}
    </div>
  );
}
