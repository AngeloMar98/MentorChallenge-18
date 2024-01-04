import React from "react";
import { TabNumber } from "./TabNumber";

export function TabsNumber({ currTab }) {
  return (
    <div className="w-fit flex flex-row laptop:flex-col gap-3 mx-auto laptop:mx-0 py-8 text-sm laptop:bg-[url('./images/bg-sidebar-desktop.svg')] bg-bottom  laptop:rounded-md bg-cover bg-no-repeat laptop:w-full laptop:gap-6">
      <TabNumber nums={[1]} currentNum={currTab} title="YOUR INFO" />
      <TabNumber nums={[2]} currentNum={currTab} title="SELECT PLAN" />
      <TabNumber nums={[3]} currentNum={currTab} title="ADD-ONS" />
      <TabNumber nums={[4, 5]} currentNum={currTab} title="SUMMARY" />
    </div>
  );
}
