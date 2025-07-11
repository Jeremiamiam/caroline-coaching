import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Steps DaisyUI
 * https://daisyui.com/components/steps/
 */
const Steps = forwardRef(({
  children,
  className = '',
  vertical = false,
  ...props
}, ref) => {
  const classes = [
    'steps',
    vertical && 'steps-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <ul ref={ref} className={classes} {...props}>
      {children}
    </ul>
  );
});

Steps.displayName = 'Steps';

// Step Item
const StepItem = forwardRef(({
  children,
  className = '',
  active = false,
  completed = false,
  variant = 'default',
  icon,
  ...props
}, ref) => {
  const variantClasses = {
    default: '',
    primary: 'step-primary',
    secondary: 'step-secondary',
    accent: 'step-accent',
    info: 'step-info',
    success: 'step-success',
    warning: 'step-warning',
    error: 'step-error',
  };

  const classes = [
    'step',
    active && 'step-active',
    completed && 'step-primary',
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <li ref={ref} className={classes} {...props}>
      {icon && <span className="step-icon">{icon}</span>}
      {children}
    </li>
  );
});

StepItem.displayName = 'StepItem';

// Steps avec variantes
const StepsVertical = forwardRef(({ className = '', ...props }, ref) => (
  <Steps
    ref={ref}
    vertical
    className={className}
    {...props}
  />
));

const StepsHorizontal = forwardRef(({ className = '', ...props }, ref) => (
  <Steps
    ref={ref}
    vertical={false}
    className={className}
    {...props}
  />
));

// Steps avec couleurs
const StepsPrimary = forwardRef(({ children, className = '', ...props }, ref) => (
  <Steps ref={ref} className={className} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { variant: 'primary' })
    )}
  </Steps>
));

const StepsSecondary = forwardRef(({ children, className = '', ...props }, ref) => (
  <Steps ref={ref} className={className} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { variant: 'secondary' })
    )}
  </Steps>
));

const StepsAccent = forwardRef(({ children, className = '', ...props }, ref) => (
  <Steps ref={ref} className={className} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { variant: 'accent' })
    )}
  </Steps>
));

const StepsInfo = forwardRef(({ children, className = '', ...props }, ref) => (
  <Steps ref={ref} className={className} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { variant: 'info' })
    )}
  </Steps>
));

const StepsSuccess = forwardRef(({ children, className = '', ...props }, ref) => (
  <Steps ref={ref} className={className} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { variant: 'success' })
    )}
  </Steps>
));

const StepsWarning = forwardRef(({ children, className = '', ...props }, ref) => (
  <Steps ref={ref} className={className} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { variant: 'warning' })
    )}
  </Steps>
));

const StepsError = forwardRef(({ children, className = '', ...props }, ref) => (
  <Steps ref={ref} className={className} {...props}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { variant: 'error' })
    )}
  </Steps>
));

// Steps Template - Configuration rapide
const StepsTemplate = ({
  steps = [],
  currentStep = 0,
  onStepClick,
  vertical = false,
  variant = 'default',
  showIcons = false,
  className = '',
  ...props
}) => {
  const renderStep = (step, index) => {
    const isActive = index === currentStep;
    const isCompleted = index < currentStep;
    const isClickable = step.clickable !== false && onStepClick;

    return (
      <StepItem
        key={index}
        active={isActive}
        completed={isCompleted}
        variant={isCompleted ? 'primary' : isActive ? variant : 'default'}
        icon={showIcons && step.icon}
        onClick={isClickable ? () => onStepClick(index) : undefined}
        className={isClickable ? 'cursor-pointer' : ''}
      >
        {step.title || step.label}
      </StepItem>
    );
  };

  return (
    <Steps
      vertical={vertical}
      className={className}
      {...props}
    >
      {steps.map(renderStep)}
    </Steps>
  );
};

StepsTemplate.displayName = 'StepsTemplate';

// Steps avec navigation
const StepsWithNavigation = ({
  steps = [],
  currentStep = 0,
  onStepChange,
  onNext,
  onPrevious,
  onComplete,
  vertical = false,
  variant = 'default',
  showNavigation = true,
  className = '',
  ...props
}) => {
  const canGoPrevious = currentStep > 0;
  const canGoNext = currentStep < steps.length - 1;
  const isLastStep = currentStep === steps.length - 1;

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep && onStepChange) {
      onStepChange(stepIndex);
    }
  };

  const handleNext = () => {
    if (canGoNext && onNext) {
      onNext();
    } else if (isLastStep && onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious && onPrevious) {
      onPrevious();
    }
  };

  return (
    <div className="space-y-6">
      <StepsTemplate
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        vertical={vertical}
        variant={variant}
        showIcons={true}
        className={className}
        {...props}
      />

      {/* Contenu de l'étape actuelle */}
      {steps[currentStep] && (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{steps[currentStep].title}</h2>
            {steps[currentStep].content && (
              <p>{steps[currentStep].content}</p>
            )}
            {steps[currentStep].component && steps[currentStep].component}
          </div>
        </div>
      )}

      {/* Navigation */}
      {showNavigation && (
        <div className="flex justify-between">
          <button
            className="btn btn-outline"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
          >
            ← Précédent
          </button>
          
          <div className="flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleNext}
            >
              {isLastStep ? 'Terminer' : 'Suivant →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

StepsWithNavigation.displayName = 'StepsWithNavigation';

// Steps wizard complet
const StepsWizard = ({
  steps = [],
  onComplete,
  vertical = false,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete?.();
  };

  return (
    <StepsWithNavigation
      steps={steps}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onComplete={handleComplete}
      vertical={vertical}
      variant={variant}
      className={className}
      {...props}
    />
  );
};

StepsWizard.displayName = 'StepsWizard';

// Steps responsive
const StepsResponsive = ({
  steps = [],
  currentStep = 0,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-4">
      {/* Version mobile : vertical */}
      <div className="sm:hidden">
        <StepsTemplate
          steps={steps}
          currentStep={currentStep}
          vertical={true}
          className={className}
          {...props}
        />
      </div>

      {/* Version desktop : horizontal */}
      <div className="hidden sm:block">
        <StepsTemplate
          steps={steps}
          currentStep={currentStep}
          vertical={false}
          className={className}
          {...props}
        />
      </div>
    </div>
  );
};

StepsResponsive.displayName = 'StepsResponsive';

// Steps avec indicateur de progression
const StepsWithProgress = ({
  steps = [],
  currentStep = 0,
  className = '',
  ...props
}) => {
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-4">
      {/* Barre de progression */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-base-content/70 mb-1">
          <span>Étape {currentStep + 1} sur {steps.length}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <progress
          className="progress progress-primary w-full"
          value={progressPercentage}
          max="100"
        />
      </div>

      {/* Steps */}
      <StepsTemplate
        steps={steps}
        currentStep={currentStep}
        className={className}
        {...props}
      />
    </div>
  );
};

StepsWithProgress.displayName = 'StepsWithProgress';

// PropTypes
Steps.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

StepItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  icon: PropTypes.node,
};

StepsTemplate.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.node,
    clickable: PropTypes.bool,
  })),
  currentStep: PropTypes.number,
  onStepClick: PropTypes.func,
  vertical: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  showIcons: PropTypes.bool,
  className: PropTypes.string,
};

StepsWithNavigation.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    component: PropTypes.node,
    icon: PropTypes.node,
  })),
  currentStep: PropTypes.number,
  onStepChange: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onComplete: PropTypes.func,
  vertical: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  showNavigation: PropTypes.bool,
  className: PropTypes.string,
};

StepsWizard.propTypes = {
  steps: PropTypes.array.isRequired,
  onComplete: PropTypes.func,
  vertical: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

StepsResponsive.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number,
  className: PropTypes.string,
};

StepsWithProgress.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number,
  className: PropTypes.string,
};

// Attacher les noms d'affichage
StepsVertical.displayName = 'StepsVertical';
StepsHorizontal.displayName = 'StepsHorizontal';
StepsPrimary.displayName = 'StepsPrimary';
StepsSecondary.displayName = 'StepsSecondary';
StepsAccent.displayName = 'StepsAccent';
StepsInfo.displayName = 'StepsInfo';
StepsSuccess.displayName = 'StepsSuccess';
StepsWarning.displayName = 'StepsWarning';
StepsError.displayName = 'StepsError';

// Export des sous-composants
Steps.Item = StepItem;
Steps.Vertical = StepsVertical;
Steps.Horizontal = StepsHorizontal;
Steps.Primary = StepsPrimary;
Steps.Secondary = StepsSecondary;
Steps.Accent = StepsAccent;
Steps.Info = StepsInfo;
Steps.Success = StepsSuccess;
Steps.Warning = StepsWarning;
Steps.Error = StepsError;
Steps.Template = StepsTemplate;
Steps.WithNavigation = StepsWithNavigation;
Steps.Wizard = StepsWizard;
Steps.Responsive = StepsResponsive;
Steps.WithProgress = StepsWithProgress;

export default Steps; 