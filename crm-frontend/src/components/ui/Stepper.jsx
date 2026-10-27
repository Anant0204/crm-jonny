import React from 'react';
import { Check } from 'lucide-react';
import { cx } from '../../utils/classNames';

export const Stepper = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className="stepper">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <div
              className={cx(
                'stepper-step',
                isActive && 'stepper-step-active',
                isCompleted && 'stepper-step-completed'
              )}
            >
              <div className="stepper-circle">
                {isCompleted ? <Check size={16} strokeWidth={3} /> : idx + 1}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-primary">{step.label}</span>
                {step.description && <span className="text-xs text-tertiary">{step.description}</span>}
              </div>
            </div>

            {idx < steps.length - 1 && <div className="stepper-line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
