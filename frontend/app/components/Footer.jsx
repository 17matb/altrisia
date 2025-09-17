import Logo from './ui/Logo';

const Footer = () => {
  return (
    <footer className="my-8 flex flex-col md:flex-row items-center justify-between">
      <Logo />
      <p>Un projet par Chaima H., Matthis B. et Kirill S.</p>
    </footer>
  );
};

export default Footer;
