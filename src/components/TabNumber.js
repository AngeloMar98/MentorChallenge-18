import React from "react";

export function TabNumber({ nums, currentNum, title }) {
  return (
    <div className="flex flex-row gap-3 items-center laptop:pl-6">
      <span
        className={`rounded-full text-center p-1 w-[30px] h-[30px] text-white border border-white ${
          nums.includes(currentNum) ? "active-tabNum" : ""
        }`}
      >
        {nums[0]}
      </span>
      <div className=" flex-col text-sm hidden laptop:flex">
        <span className="text-pastelBlue">STEP {nums[0]}</span>
        <span className="font-semibold text-white">{title}</span>
      </div>
    </div>
  );
}
