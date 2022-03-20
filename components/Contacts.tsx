import clsx from "clsx";
import {
  BsFillHouseFill,
  BsLinkedin,
  BsGithub,
  BsInstagram,
} from "react-icons/bs";

interface Props {}

interface ContactProps {
  icon: JSX.Element;
  bg: string;
  link: string;
}

const Contact: React.FC<ContactProps> = ({ icon, bg, link }) => {
  return (
    <div
      className={clsx(
        "p-3 rounded-full cursor-pointer text-3xl flex items-center justify-center text-white shadow-md hover:scale-110 transition duration-200",
        bg
      )}
    >
      <a href={link} target="_blank" rel="noreferrer">
        {icon}
      </a>
    </div>
  );
};

const Contacts: React.FC<Props> = () => {
  return (
    <div className="w-full flex gap-4 items-center justify-center">
      <Contact
        icon={<BsFillHouseFill />}
        bg="bg-purple-400"
        link="https://forsmark.dev"
      />
      <Contact
        icon={<BsLinkedin />}
        bg="bg-blue-500"
        link="https://www.linkedin.com/in/marc-forsmark-nielsen/"
      />
      <Contact
        icon={<BsGithub />}
        bg="bg-gray-800"
        link="https://github.com/forsmark"
      />
      <Contact
        icon={<BsInstagram />}
        bg="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        link="https://www.instagram.com/forsmark.dev/"
      />
    </div>
  );
};

export default Contacts;
