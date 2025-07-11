import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Footer DaisyUI
 * https://daisyui.com/components/footer/
 */
const Footer = forwardRef(({
  children,
  center = false,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'footer',
    center && 'footer-center',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer ref={ref} className={classes} {...props}>
      {children}
    </footer>
  );
});

Footer.displayName = 'Footer';

// Footer Template avec personnalisation
const FooterTemplate = ({
  children,
  center = false,
  color,
  padding = 'p-10',
  className = '',
  ...props
}) => {
  const classes = [
    'footer',
    center && 'footer-center',
    color && `text-${color}`,
    padding,
    className
  ].filter(Boolean).join(' ');

  return (
    <Footer
      center={center}
      className={classes}
      {...props}
    >
      {children}
    </Footer>
  );
};

FooterTemplate.displayName = 'FooterTemplate';

// Footer centré
const FooterCenter = ({ className = '', ...props }) => (
  <Footer center className={className} {...props} />
);

FooterCenter.displayName = 'FooterCenter';

// Footer avec background
const FooterNeutral = ({ className = '', ...props }) => (
  <Footer className={`bg-neutral text-neutral-content ${className}`} {...props} />
);

FooterNeutral.displayName = 'FooterNeutral';

// Footer avec colonnes
const FooterColumns = ({ 
  columns = [], 
  center = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'footer',
    center && 'footer-center',
    'bg-neutral text-neutral-content',
    'p-10',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...props}>
      {columns.map((column, index) => (
        <nav key={index}>
          {column.title && (
            <h6 className="footer-title">{column.title}</h6>
          )}
          {column.links && column.links.map((link, linkIndex) => (
            <a key={linkIndex} className="link link-hover" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      ))}
    </footer>
  );
};

FooterColumns.displayName = 'FooterColumns';

// Footer simple avec logo
const FooterLogo = ({ 
  logo,
  logoText,
  links = [],
  center = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'footer',
    center && 'footer-center',
    'bg-neutral text-neutral-content',
    'p-10',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...props}>
      <aside>
        {logo && (
          <div className="w-12 h-12 mb-2">
            {typeof logo === 'string' ? (
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              logo
            )}
          </div>
        )}
        {logoText && <p>{logoText}</p>}
      </aside>
      {links.length > 0 && (
        <nav>
          <h6 className="footer-title">Liens</h6>
          {links.map((link, index) => (
            <a key={index} className="link link-hover" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </footer>
  );
};

FooterLogo.displayName = 'FooterLogo';

// Footer avec réseaux sociaux
const FooterSocial = ({ 
  socialLinks = [],
  title = "Nous suivre",
  center = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'footer',
    center && 'footer-center',
    'bg-neutral text-neutral-content',
    'p-10',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...props}>
      <nav>
        <h6 className="footer-title">{title}</h6>
        <div className="grid grid-flow-col gap-4">
          {socialLinks.map((social, index) => (
            <a key={index} href={social.href} className="link link-hover">
              {social.icon ? (
                <span className="text-2xl">{social.icon}</span>
              ) : (
                social.label
              )}
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
};

FooterSocial.displayName = 'FooterSocial';

// Footer complet avec plusieurs sections
const FooterComplete = ({ 
  logo,
  logoText,
  columns = [],
  socialLinks = [],
  copyright,
  center = false,
  className = '',
  ...props 
}) => {
  const footerClasses = [
    'footer',
    'bg-neutral text-neutral-content',
    'p-10',
    className
  ].filter(Boolean).join(' ');

  const copyrightClasses = [
    'footer',
    center && 'footer-center',
    'bg-neutral text-neutral-content',
    'border-t border-neutral-content/20 px-10 py-4'
  ].filter(Boolean).join(' ');

  return (
    <>
      <footer className={footerClasses} {...props}>
        {/* Logo section */}
        <aside>
          {logo && (
            <div className="w-12 h-12 mb-2">
              {typeof logo === 'string' ? (
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                logo
              )}
            </div>
          )}
          {logoText && <p>{logoText}</p>}
        </aside>

        {/* Columns */}
        {columns.map((column, index) => (
          <nav key={index}>
            {column.title && (
              <h6 className="footer-title">{column.title}</h6>
            )}
            {column.links && column.links.map((link, linkIndex) => (
              <a key={linkIndex} className="link link-hover" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        ))}

        {/* Social */}
        {socialLinks.length > 0 && (
          <nav>
            <h6 className="footer-title">Réseaux sociaux</h6>
            <div className="grid grid-flow-col gap-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="link link-hover">
                  {social.icon ? (
                    <span className="text-2xl">{social.icon}</span>
                  ) : (
                    social.label
                  )}
                </a>
              ))}
            </div>
          </nav>
        )}
      </footer>

      {/* Copyright */}
      {copyright && (
        <footer className={copyrightClasses}>
          <aside>
            <p>{copyright}</p>
          </aside>
        </footer>
      )}
    </>
  );
};

FooterComplete.displayName = 'FooterComplete';

// Footer minimal
const FooterMinimal = ({ 
  text,
  links = [],
  center = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'footer',
    center && 'footer-center',
    'bg-base-200 text-base-content',
    'p-4',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...props}>
      <aside>
        {text && <p>{text}</p>}
      </aside>
      {links.length > 0 && (
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          {links.map((link, index) => (
            <a key={index} className="link link-hover" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </footer>
  );
};

FooterMinimal.displayName = 'FooterMinimal';

// Footer avec newsletter
const FooterNewsletter = ({ 
  title = "Newsletter",
  description = "Entrez votre email pour recevoir nos actualités",
  placeholder = "Votre email",
  buttonText = "S'abonner",
  onSubscribe,
  className = '',
  ...props 
}) => {
  const classes = [
    'footer',
    'bg-neutral text-neutral-content',
    'p-10',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...props}>
      <form onSubmit={onSubscribe}>
        <h6 className="footer-title">{title}</h6>
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text text-neutral-content">{description}</span>
          </label>
          <div className="join">
            <input
              type="email"
              placeholder={placeholder}
              className="input input-bordered join-item"
              required
            />
            <button className="btn btn-primary join-item" type="submit">
              {buttonText}
            </button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

FooterNewsletter.displayName = 'FooterNewsletter';

// PropTypes
Footer.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  className: PropTypes.string,
};

FooterTemplate.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  color: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string,
};

FooterColumns.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
  })),
  center: PropTypes.bool,
  className: PropTypes.string,
};

FooterLogo.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  logoText: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })),
  center: PropTypes.bool,
  className: PropTypes.string,
};

FooterSocial.propTypes = {
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string.isRequired,
    icon: PropTypes.node,
  })),
  title: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
};

FooterComplete.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  logoText: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
  })),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string.isRequired,
    icon: PropTypes.node,
  })),
  copyright: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
};

FooterMinimal.propTypes = {
  text: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })),
  center: PropTypes.bool,
  className: PropTypes.string,
};

FooterNewsletter.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  onSubscribe: PropTypes.func,
  className: PropTypes.string,
};

// Attacher les sous-composants au composant principal
Footer.Template = FooterTemplate;
Footer.Center = FooterCenter;
Footer.Neutral = FooterNeutral;
Footer.Columns = FooterColumns;
Footer.Logo = FooterLogo;
Footer.Social = FooterSocial;
Footer.Complete = FooterComplete;
Footer.Minimal = FooterMinimal;
Footer.Newsletter = FooterNewsletter;

// Exports
export default Footer;
export {
  Footer,
  FooterTemplate,
  FooterCenter,
  FooterNeutral,
  FooterColumns,
  FooterLogo,
  FooterSocial,
  FooterComplete,
  FooterMinimal,
  FooterNewsletter,
}; 