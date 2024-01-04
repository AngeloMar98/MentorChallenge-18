import React, { useState } from "react";
import "./../index.css";
import { TabsNumber } from "./TabsNumber";
import arcadeIcon from "./../images/icon-arcade.svg";
import advancedIcon from "./../images/icon-advanced.svg";
import proIcon from "./../images/icon-pro.svg";
import thankIcon from "./../images/icon-thank-you.svg";

export function MultiStepsForm() {
  const [currTab, setCurrTab] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  function nextTab() {
    if (currTab > 4) return;
    setCurrTab((t) => t + 1);
  }
  function prevTab() {
    if (currTab === 1) return;
    setCurrTab((t) => t - 1);
  }

  function backToStart() {
    setCurrTab(2);
  }

  return (
    <section className="bg-[url('./images/bg-sidebar-mobile.svg')] laptop:bg-none bg-no-repeat bg-contain bg-gray-magnolia min-h-screen flex laptop:items-center laptop:px-4">
      <div className="forms-grid flex flex-col w-full max-w-[900px] min-h-screen mx-auto laptop:flex-row laptop:min-h-[80vh] laptop:bg-white laptop:p-3 laptop:my-auto laptop:rounded-md">
        <TabsNumber currTab={currTab} />
        <div className="h-full flex flex-col laptop:mx-auto items-center">
          <StepsForm
            currTab={currTab}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            number={number}
            setNumber={setNumber}
            onNext={nextTab}
            onStart={backToStart}
          />
          {currTab < 5 && (
            <PageChanger currTab={currTab} onNext={nextTab} onPrev={prevTab} />
          )}
        </div>
      </div>
    </section>
  );
}

function Step({ title, paragraph, children }) {
  return (
    <article className="laptop:min-w-full bg-white rounded-lg p-4 pt-6 ">
      <h2>{title}</h2>
      <p className="mb-4">{paragraph}</p>
      {children}
    </article>
  );
}

function StepsForm({
  currTab,
  name,
  setName,
  email,
  setEmail,
  number,
  setNumber,
  onNext,
  onStart,
}) {
  const [plan, setPlan] = useState("Arcade");
  const [cadence, setCadence] = useState("Monthly");

  let price = 9;
  plan === "Arcade" && (price = 9);
  plan === "Advanced" && (price = 12);
  plan === "Pro" && (price = 15);

  cadence === "Yearly" && (price *= 10);
  const [onlineService, setOnlineService] = useState(true);
  const [largerStorage, setLargerStorage] = useState(true);
  const [customProfile, setCustomProfile] = useState(true);

  return (
    <div className="px-3 mb-4 laptop:w-[500px] laptop:my-auto">
      {currTab === 1 && (
        <Step
          title="Personal info"
          paragraph="Please provide your name, email address, and phone number."
        >
          <UserForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            number={number}
            setNumber={setNumber}
            onNext={onNext}
          />
        </Step>
      )}
      {currTab === 2 && (
        <Step
          title="Select your plan"
          paragraph="You have the option of monthly or yearly billing."
        >
          <PlanSelect
            plan={plan}
            setPlan={setPlan}
            cadence={cadence}
            setCadence={setCadence}
          />
        </Step>
      )}
      {currTab === 3 && (
        <Step
          title="Pick add-ons"
          paragraph="Add-ons help enhance your gaming experience."
        >
          <AddonsSelect
            yearlyIsToggled={cadence === "Yearly"}
            onAddCustomProfile={setCustomProfile}
            customProfile={customProfile}
            onAddOnlineService={setOnlineService}
            onlineService={onlineService}
            onAddLargerStorage={setLargerStorage}
            largerStorage={largerStorage}
          />
        </Step>
      )}
      {currTab === 4 && (
        <Step
          title="Finishing up"
          paragraph="Double-check everything looks Ok before confirming."
        >
          <Summary
            plan={plan}
            price={price}
            yearlyIsToggled={cadence === "Yearly"}
            onlineService={onlineService}
            largerStorage={largerStorage}
            customProfile={customProfile}
            onStart={onStart}
          />
        </Step>
      )}
      {currTab === 5 && <ThankYou />}
    </div>
  );
}

function ThankYou() {
  return (
    <div className="flex flex-col justify-between gap-2 text-center items-center px-3 py-16 rounded-lg bg-white ">
      <img className="w-[45px]" src={thankIcon} alt="Thank you icon" />
      <h2 className="mb-0">Thank you!</h2>
      <p className="text-gray-coolGray">
        Thanks for confirming your subscription! <br />
        We hope you have fun using our platform. If you ever need support, plese
        feel free to email us at support@loremgaming.com.
      </p>
    </div>
  );
}

function Summary({
  plan,
  yearlyIsToggled,
  onlineService,
  largerStorage,
  customProfile,
  price,
  onStart,
}) {
  const onlineServicePrice = yearlyIsToggled ? 10 : 1;
  const largerStoragePrice = yearlyIsToggled ? 20 : 2;
  const customProfilePrice = yearlyIsToggled ? 20 : 2;

  const totalPrice =
    price + onlineServicePrice + largerStoragePrice + customProfilePrice;

  return (
    <div className="text-sm ">
      <div className="p-3 bg-gray-magnolia rounded-md">
        <p className="text-marineBlue font-semibold">
          {plan} ({yearlyIsToggled ? "Yearly" : "Monthly"})
        </p>
        <p className="flex flex-row justify-between mb-3">
          <span
            className="underline hover:cursor-pointer transition-colors duration-100 hover:text-blue"
            onClick={onStart}
          >
            Change
          </span>
          <span className="text-marineBlue font-semibold">
            ${price}/{yearlyIsToggled ? "yr" : "mo"}
          </span>
        </p>
        {(onlineService || largerStorage || customProfile) && (
          <hr className="border-none h-[1px] bg-gray-lightGray mb-3 " />
        )}
        {onlineService && (
          <p className="flex flex-row justify-between mb-3">
            <span>Online service</span>
            <span className="text-marineBlue ">
              +${onlineServicePrice}/{yearlyIsToggled ? "yr" : "mo"}
            </span>
          </p>
        )}
        {largerStorage && (
          <p className="flex flex-row justify-between mb-3" b>
            <span>Larger storage</span>
            <span className="text-marineBlue ">
              +${largerStoragePrice}/{yearlyIsToggled ? "yr" : "mo"}
            </span>
          </p>
        )}
        {customProfile && (
          <p className="flex flex-row justify-between ">
            <span>Customizable profile</span>
            <span className="text-marineBlue ">
              +${customProfilePrice}/{yearlyIsToggled ? "yr" : "mo"}
            </span>
          </p>
        )}
      </div>
      <p className="flex flex-row justify-between p-3 ">
        <span>Total (per {yearlyIsToggled ? "year" : "month"})</span>
        <span className="text-blue text-base font-semibold">
          +${totalPrice}/{yearlyIsToggled ? "yr" : "mo"}
        </span>
      </p>
    </div>
  );
}

function AddonsSelect({
  yearlyIsToggled,
  onAddCustomProfile,
  customProfile,
  onAddOnlineService,
  onlineService,
  onAddLargerStorage,
  largerStorage,
}) {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <Addon
        title="Online service"
        text="Access to multiplayer games"
        price={1}
        yearlyIsToggled={yearlyIsToggled}
        isSelected={onlineService}
        onAdd={onAddOnlineService}
      />
      <Addon
        title="Larger storage"
        text="Extra 1TB of cloud save"
        price={2}
        yearlyIsToggled={yearlyIsToggled}
        isSelected={largerStorage}
        onAdd={onAddLargerStorage}
      />
      <Addon
        title="Customizable profile"
        text="Custom theme on your profile"
        price={2}
        yearlyIsToggled={yearlyIsToggled}
        isSelected={customProfile}
        onAdd={onAddCustomProfile}
      />
    </div>
  );
}

function Addon({ title, text, price, yearlyIsToggled, isSelected, onAdd }) {
  return (
    <div
      className={`rounded-lg p-3  hover:cursor-pointer  border border-gray-lightGray hover:border-blue  flex flex-row gap-4 ${
        isSelected ? "active" : ""
      }`}
      onClick={() => onAdd(!isSelected)}
    >
      <div className={`checkbox ${isSelected ? "checked" : ""} my-auto`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="9"
          viewBox="0 0 12 9"
        >
          <path
            fill="none"
            stroke="#FFF"
            stroke-width="2"
            d="m1 4 3.433 3.433L10.866 1"
          />
        </svg>
      </div>
      <div>
        <h3>{title}</h3>
        <p className="text-sm">{text}</p>
      </div>
      <p className="my-auto ml-auto">
        {yearlyIsToggled ? `+$${price * 10 + "/yr"}` : `+$${price + "/mo"}`}
      </p>
    </div>
  );
}

function PlanSelect({ plan, setPlan, cadence, setCadence }) {
  const yearlyIsToggled = cadence === "Yearly";
  return (
    <>
      <div className="flex flex-col laptop:grid laptop:grid-cols-3 gap-3">
        <PlanType
          onClick={setPlan}
          imgSrc={arcadeIcon}
          alt="Arcade Plan Icon"
          title="Arcade"
          moPrice={9}
          yearlyIsToggled={yearlyIsToggled}
          currPlan={plan}
        />
        <PlanType
          onClick={setPlan}
          imgSrc={advancedIcon}
          alt="Advanced Plan Icon"
          title="Advanced"
          moPrice={12}
          yearlyIsToggled={yearlyIsToggled}
          currPlan={plan}
        />
        <PlanType
          onClick={setPlan}
          imgSrc={proIcon}
          alt="Pro Plan Icon"
          title="Pro"
          moPrice={15}
          yearlyIsToggled={yearlyIsToggled}
          currPlan={plan}
        />
      </div>

      <ToggleCadence currCadence={cadence} onCadenceChange={setCadence} />
    </>
  );
}

function ToggleCadence({ currCadence, onCadenceChange }) {
  return (
    <div className="bg-gray-magnolia rounded-lg py-3 mt-6">
      <div className="flex flex-row w-fit items-center mx-auto gap-6 text-gray-coolGray">
        <span
          className={`${currCadence === "Monthly" ? "text-marineBlue" : ""}`}
        >
          Monthly
        </span>
        <span
          className="bg-marineBlue hover:cursor-pointer  h-[18px] w-[35px] rounded-full py-[0.3rem] flex items-center relative"
          onClick={() =>
            onCadenceChange(currCadence !== "Monthly" ? "Monthly" : "Yearly")
          }
        >
          <span
            className={`rounded-full inline-block w-[12px] h-[12px] bg-white transition-all duration-300 absolute ${
              currCadence === "Monthly" ? "left-[0.15rem]" : "left-[1.15rem]"
            }`}
          ></span>
        </span>
        <span
          className={`${currCadence === "Yearly" ? "text-marineBlue" : ""}`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
}

function PlanType({
  imgSrc,
  alt,
  title,
  moPrice,
  yearlyIsToggled,
  currPlan,
  onClick,
}) {
  return (
    <div
      onClick={() => onClick(title)}
      className={`rounded-lg p-3  hover:cursor-pointer  border border-gray-lightGray hover:border-blue  flex flex-row laptop:flex-col laptop:gap-8  gap-4  ${
        currPlan === title ? "active" : ""
      }`}
    >
      <img src={imgSrc} alt={alt} className="w-[45px] mb-auto mt-[0.4rem]" />
      <div className="flex flex-col">
        <h3>{title}</h3>
        <p className="text-gray-coolGray">
          {yearlyIsToggled ? `$${moPrice * 10}/yr` : `$${moPrice}/mo`}
        </p>
        {yearlyIsToggled && (
          <p className="text-sm text-marineBlue">2 months free</p>
        )}
      </div>
    </div>
  );
}

function PageChanger({ currTab, onPrev, onNext }) {
  return (
    <div className="flex flex-row justify-between items-center p-6 bg-white mt-auto w-full">
      {currTab > 1 && (
        <button
          onClick={() => onPrev()}
          className="text-gray-coolGray hover:cursor-pointer hover:text-marineBlue transition-colors duration-100"
        >
          Go Back
        </button>
      )}

      <button
        onClick={() => {
          if (currTab === 1) return;
          onNext();
        }}
        form="submit-form"
        type="submit"
        value="Submit"
        className={`${
          currTab >= 4 ? "bg-blue" : "bg-marineBlue"
        } text-white py-2 px-4 rounded-md  hover:cursor-pointer ml-auto transition-color duration-100 hover:bg-blue`}
      >
        {currTab >= 4 ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
}

function UserForm({
  name,
  setName,
  email,
  setEmail,
  number,
  setNumber,
  onNext,
}) {
  let [nameInvalid, setNameInvalid] = useState(false);
  let [emailInvalid, setEmailInvalid] = useState(false);
  let [phoneInvalid, setPhoneInvalid] = useState(false);

  return (
    <form
      id="submit-form"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
        setNameInvalid(false);
        setEmailInvalid(false);
        setPhoneInvalid(false);
      }}
    >
      <div className="flex flex-col mb-3">
        <div className="flex flex-row justify-between mb-1">
          <label htmlFor="formName" className="text-marineBlue text-sm">
            Name
          </label>
          <span
            className={`text-red font-semibold text-sm ${
              nameInvalid ? "" : "hidden"
            }`}
          >
            This field is required
          </span>
        </div>
        <input
          id="formName"
          required
          placeholder="e.g. Stephen King"
          className={`border border-gray-lightGray  rounded-md py-2 px-4  font-medium hover:cursor-pointer ${
            nameInvalid ? "border-red" : "hover:border-gray-coolGray"
          }`}
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          onInvalid={(e) => {
            e.preventDefault();
            setNameInvalid(true);
          }}
        />
      </div>
      <div className="flex flex-col mb-3">
        <div className="flex flex-row justify-between mb-1">
          <label htmlFor="formEmail" className="text-marineBlue text-sm">
            Email Address
          </label>
          <span
            className={`text-red font-semibold text-sm ${
              emailInvalid ? "" : "hidden"
            }`}
          >
            This field is required
          </span>
        </div>
        <input
          required
          id="formEmail"
          placeholder="e.g. stephenking@lorem.com"
          className={`border ${
            emailInvalid ? "border-red" : "hover:border-gray-coolGray"
          }  rounded-md py-2 px-4 border-gray-lightGray  font-medium hover:cursor-pointer`}
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={(e) => {
            e.preventDefault();
            setEmailInvalid(true);
          }}
        />
      </div>
      <div className="flex flex-col mb-3">
        <div className="flex flex-row justify-between mb-1">
          <label htmlFor="formNumber" className="text-marineBlue text-sm">
            Phone Number
          </label>
          <span
            className={`text-red font-semibold text-sm ${
              phoneInvalid ? "" : "hidden"
            }`}
          >
            This field is required
          </span>
        </div>
        <input
          required
          id="formNumber"
          placeholder="e.g. +1 234 567 890"
          className={`border border-gray-lightGray  rounded-md py-2 px-4 ${
            nameInvalid ? "border-red" : "hover:border-gray-coolGray"
          } font-medium hover:cursor-pointer`}
          value={number}
          maxLength="10"
          minLength="10"
          type="text"
          onChange={(e) => {
            if (isNaN(e.nativeEvent.data)) return;
            setNumber(e.target.value);
          }}
          onInvalid={(e) => {
            e.preventDefault();
            setPhoneInvalid(true);
          }}
        />
      </div>
    </form>
  );
}
