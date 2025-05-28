import Link from "next/link";
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

interface PillProps {
  href: string;
  label: string;
  handle: string;
  contain?: boolean;
}

const Pill: React.FC<PillProps> = ({
  href,
  label,
  handle,
  contain = false,
}: PillProps) => {
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
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium hover:bg-neutral-100"
      target={contain ? "_self" : "_blank"}
    >
      {getLogo(label)}
      {handle}
    </Link>
  );
};

export default Pill;
