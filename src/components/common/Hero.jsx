import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Hero DaisyUI
 * https://daisyui.com/components/hero/
 */
const Hero = forwardRef(({
  children,
  className = '',
  minHeight = 'min-h-screen',
  ...props
}, ref) => {
  const classes = [
    'hero',
    minHeight,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Hero.displayName = 'Hero';

// Hero Template avec personnalisation
const HeroTemplate = ({
  children,
  background,
  overlay = false,
  overlayOpacity = '50',
  minHeight = 'min-h-screen',
  className = '',
  ...props
}) => {
  const classes = [
    'hero',
    minHeight,
    background,
    className
  ].filter(Boolean).join(' ');

  return (
    <Hero
      minHeight={minHeight}
      className={classes}
      {...props}
    >
      {overlay && (
        <div className={`hero-overlay bg-opacity-${overlayOpacity}`}></div>
      )}
      {children}
    </Hero>
  );
};

HeroTemplate.displayName = 'HeroTemplate';

// Hero Content - contenu centré
const HeroContent = forwardRef(({
  children,
  textAlign = 'text-center',
  className = '',
  ...props
}, ref) => {
  const classes = [
    'hero-content',
    textAlign,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

HeroContent.displayName = 'HeroContent';

// Hero simple avec titre et description
const HeroSimple = ({ 
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  minHeight = 'min-h-screen',
  className = '',
  ...props 
}) => {
  const classes = [
    'hero',
    minHeight,
    'bg-base-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          {subtitle && (
            <p className="text-lg font-semibold text-primary mb-2">{subtitle}</p>
          )}
          {title && (
            <h1 className="text-5xl font-bold">{title}</h1>
          )}
          {description && (
            <p className="py-6">{description}</p>
          )}
          {(primaryButton || secondaryButton) && (
            <div className="flex gap-4 justify-center">
              {primaryButton && (
                <button 
                  className={`btn btn-primary ${primaryButton.size || ''}`}
                  onClick={primaryButton.onClick}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.label}
                </button>
              )}
              {secondaryButton && (
                <button 
                  className={`btn btn-outline ${secondaryButton.size || ''}`}
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

HeroSimple.displayName = 'HeroSimple';

// Hero avec image de fond
const HeroImage = ({ 
  backgroundImage,
  overlay = true,
  overlayOpacity = '60',
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  minHeight = 'min-h-screen',
  className = '',
  ...props 
}) => {
  const heroStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  const classes = [
    'hero',
    minHeight,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={heroStyle} {...props}>
      {overlay && (
        <div className={`hero-overlay bg-opacity-${overlayOpacity}`}></div>
      )}
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          {subtitle && (
            <p className="text-lg font-semibold text-accent mb-2">{subtitle}</p>
          )}
          {title && (
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          )}
          {description && (
            <p className="mb-5">{description}</p>
          )}
          {(primaryButton || secondaryButton) && (
            <div className="flex gap-4 justify-center">
              {primaryButton && (
                <button 
                  className={`btn btn-primary ${primaryButton.size || ''}`}
                  onClick={primaryButton.onClick}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.label}
                </button>
              )}
              {secondaryButton && (
                <button 
                  className={`btn btn-outline btn-accent ${secondaryButton.size || ''}`}
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

HeroImage.displayName = 'HeroImage';

// Hero avec gradient
const HeroGradient = ({ 
  gradientFrom = 'from-primary',
  gradientTo = 'to-secondary',
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  minHeight = 'min-h-screen',
  className = '',
  ...props 
}) => {
  const classes = [
    'hero',
    minHeight,
    `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          {subtitle && (
            <p className="text-lg font-semibold text-accent mb-2">{subtitle}</p>
          )}
          {title && (
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          )}
          {description && (
            <p className="mb-5">{description}</p>
          )}
          {(primaryButton || secondaryButton) && (
            <div className="flex gap-4 justify-center">
              {primaryButton && (
                <button 
                  className={`btn btn-accent ${primaryButton.size || ''}`}
                  onClick={primaryButton.onClick}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.label}
                </button>
              )}
              {secondaryButton && (
                <button 
                  className={`btn btn-outline btn-accent ${secondaryButton.size || ''}`}
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

HeroGradient.displayName = 'HeroGradient';

// Hero avec contenu à gauche et image à droite
const HeroSplit = ({ 
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  image,
  imageAlt = 'Hero Image',
  imagePosition = 'right',
  minHeight = 'min-h-screen',
  className = '',
  ...props 
}) => {
  const classes = [
    'hero',
    minHeight,
    'bg-base-200',
    className
  ].filter(Boolean).join(' ');

  const contentOrder = imagePosition === 'left' ? 'order-2' : 'order-1';
  const imageOrder = imagePosition === 'left' ? 'order-1' : 'order-2';

  return (
    <div className={classes} {...props}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        {image && (
          <img
            src={image}
            alt={imageAlt}
            className={`max-w-sm rounded-lg shadow-2xl ${imageOrder}`}
          />
        )}
        <div className={contentOrder}>
          {subtitle && (
            <p className="text-lg font-semibold text-primary mb-2">{subtitle}</p>
          )}
          {title && (
            <h1 className="text-5xl font-bold">{title}</h1>
          )}
          {description && (
            <p className="py-6">{description}</p>
          )}
          {(primaryButton || secondaryButton) && (
            <div className="flex gap-4">
              {primaryButton && (
                <button 
                  className={`btn btn-primary ${primaryButton.size || ''}`}
                  onClick={primaryButton.onClick}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.label}
                </button>
              )}
              {secondaryButton && (
                <button 
                  className={`btn btn-outline ${secondaryButton.size || ''}`}
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

HeroSplit.displayName = 'HeroSplit';

// Hero avec form
const HeroForm = ({ 
  title,
  subtitle,
  description,
  form,
  minHeight = 'min-h-screen',
  className = '',
  ...props 
}) => {
  const classes = [
    'hero',
    minHeight,
    'bg-base-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          {subtitle && (
            <p className="text-lg font-semibold text-primary mb-2">{subtitle}</p>
          )}
          {title && (
            <h1 className="text-5xl font-bold">{title}</h1>
          )}
          {description && (
            <p className="py-6">{description}</p>
          )}
        </div>
        {form && (
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={form.onSubmit}>
              {form.fields && form.fields.map((field, index) => (
                <div key={index} className="form-control">
                  <label className="label">
                    <span className="label-text">{field.label}</span>
                  </label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    className="input input-bordered"
                    required={field.required}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              ))}
              {form.submitButton && (
                <div className="form-control mt-6">
                  <button 
                    className={`btn btn-primary ${form.submitButton.size || ''}`}
                    type="submit"
                    disabled={form.submitButton.disabled}
                  >
                    {form.submitButton.label}
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

HeroForm.displayName = 'HeroForm';

// Hero minimal
const HeroMinimal = ({ 
  title,
  className = '',
  ...props 
}) => {
  const classes = [
    'hero',
    'min-h-96',
    'bg-base-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          {title && (
            <h1 className="text-5xl font-bold">{title}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

HeroMinimal.displayName = 'HeroMinimal';

// Hero avec video background
const HeroVideo = ({ 
  videoSrc,
  posterImage,
  overlay = true,
  overlayOpacity = '60',
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  minHeight = 'min-h-screen',
  className = '',
  ...props 
}) => {
  const classes = [
    'hero',
    minHeight,
    'relative overflow-hidden',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {videoSrc && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          poster={posterImage}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {overlay && (
        <div className={`hero-overlay bg-opacity-${overlayOpacity}`}></div>
      )}
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-md">
          {subtitle && (
            <p className="text-lg font-semibold text-accent mb-2">{subtitle}</p>
          )}
          {title && (
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          )}
          {description && (
            <p className="mb-5">{description}</p>
          )}
          {(primaryButton || secondaryButton) && (
            <div className="flex gap-4 justify-center">
              {primaryButton && (
                <button 
                  className={`btn btn-primary ${primaryButton.size || ''}`}
                  onClick={primaryButton.onClick}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.label}
                </button>
              )}
              {secondaryButton && (
                <button 
                  className={`btn btn-outline btn-accent ${secondaryButton.size || ''}`}
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

HeroVideo.displayName = 'HeroVideo';

// PropTypes
Hero.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  minHeight: PropTypes.string,
};

HeroTemplate.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  overlay: PropTypes.bool,
  overlayOpacity: PropTypes.string,
  minHeight: PropTypes.string,
  className: PropTypes.string,
};

HeroContent.propTypes = {
  children: PropTypes.node,
  textAlign: PropTypes.string,
  className: PropTypes.string,
};

const buttonPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
});

HeroSimple.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryButton: buttonPropType,
  secondaryButton: buttonPropType,
  minHeight: PropTypes.string,
  className: PropTypes.string,
};

HeroImage.propTypes = {
  backgroundImage: PropTypes.string,
  overlay: PropTypes.bool,
  overlayOpacity: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryButton: buttonPropType,
  secondaryButton: buttonPropType,
  minHeight: PropTypes.string,
  className: PropTypes.string,
};

HeroGradient.propTypes = {
  gradientFrom: PropTypes.string,
  gradientTo: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryButton: buttonPropType,
  secondaryButton: buttonPropType,
  minHeight: PropTypes.string,
  className: PropTypes.string,
};

HeroSplit.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryButton: buttonPropType,
  secondaryButton: buttonPropType,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(['left', 'right']),
  minHeight: PropTypes.string,
  className: PropTypes.string,
};

HeroForm.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  form: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      value: PropTypes.string,
      onChange: PropTypes.func,
    })),
    submitButton: buttonPropType,
    onSubmit: PropTypes.func,
  }),
  minHeight: PropTypes.string,
  className: PropTypes.string,
};

HeroMinimal.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

HeroVideo.propTypes = {
  videoSrc: PropTypes.string,
  posterImage: PropTypes.string,
  overlay: PropTypes.bool,
  overlayOpacity: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryButton: buttonPropType,
  secondaryButton: buttonPropType,
  minHeight: PropTypes.string,
  className: PropTypes.string,
};

// Attacher les sous-composants au composant principal
Hero.Template = HeroTemplate;
Hero.Content = HeroContent;
Hero.Simple = HeroSimple;
Hero.Image = HeroImage;
Hero.Gradient = HeroGradient;
Hero.Split = HeroSplit;
Hero.Form = HeroForm;
Hero.Minimal = HeroMinimal;
Hero.Video = HeroVideo;

// Exports
export default Hero;
export {
  Hero,
  HeroTemplate,
  HeroContent,
  HeroSimple,
  HeroImage,
  HeroGradient,
  HeroSplit,
  HeroForm,
  HeroMinimal,
  HeroVideo,
}; 