import React from "react";
import { BsBoxFill } from "react-icons/bs";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLink,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";

type PillProps = {
  href: string;
  label: string;
  handle: string;
};

const Pill: React.FC<PillProps> = ({ href, label, handle }) => {
  const getLogo = (label: string) => {
    switch (label) {
      case "GitHub":
        return <FaGithub />;
      case "LinkedIn":
        return <FaLinkedin />;
      case "X":
        return <FaXTwitter />;
      case "Email":
        return <FaEnvelope />;
      case "Facebook":
        return <FaFacebook />;
      case "Instagram":
        return <FaInstagram />;
      case "Link":
        return <FaLink />;
      case "CV":
        return <IoIosDocument />;
      case "Blog":
        return <BsBoxFill />;
      default:
        return null;
    }
  };

  return (
    <a
      href={href}
      className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-neutral-100/70 dark:hover:bg-neutral-900/70 backdrop-blur-sm
       transition text-sm font-medium"
      target="_blank"
      rel="noopener noreferrer"
    >
      {getLogo(label)}
      {handle}
    </a>
  );
};

export default Pill;
