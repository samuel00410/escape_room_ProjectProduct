import React, { useState } from "react";
import "../styles/Stepper.css";
import styled from "@emotion/styled";
import { updateLocale } from "moment/moment";
import { TiTick } from "react-icons/ti";

const Stepper = ({ currentStep, steps, complete }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => {
        return (
          <div
            key={index}
            className={`step-item ${
              currentStep === index + 1 ? "active" : ""
            } ${(index + 1 < currentStep || complete) && "complete"}`}
          >
            <div className="step">
              {index + 1 < currentStep || complete ? (
                <TiTick size={24} />
              ) : (
                index + 1
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
